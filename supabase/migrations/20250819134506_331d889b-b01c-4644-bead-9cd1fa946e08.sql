-- Enhanced security fix for ad_events table - restrict access to admins only

-- First, create a user roles system for better access control
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table for role management
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user roles (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create policies for user_roles table
CREATE POLICY "users_can_view_own_roles" ON public.user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "admins_can_manage_roles" ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Fix ad_events table - restrict to admins only for better security
DROP POLICY IF EXISTS "authenticated_users_can_read_ad_events" ON public.ad_events;

-- Only admins can view ad analytics data
CREATE POLICY "admins_can_view_ad_events" ON public.ad_events
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Keep public write for analytics tracking but add rate limiting consideration
DROP POLICY IF EXISTS "ad_events_public_write" ON public.ad_events;
CREATE POLICY "authenticated_users_can_track_ad_events" ON public.ad_events
FOR INSERT
TO authenticated
WITH CHECK (true);
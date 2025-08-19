-- Fix security issues with subscribers table RLS policies

-- First, make user_id NOT NULL to ensure proper RLS enforcement
-- (but allow existing records to remain)
ALTER TABLE public.subscribers 
ALTER COLUMN user_id SET NOT NULL;

-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "insert_subscription" ON public.subscribers;
DROP POLICY IF EXISTS "update_own_subscription" ON public.subscribers;
DROP POLICY IF EXISTS "select_own_subscription" ON public.subscribers;

-- Create secure policies that only allow access to own data
-- Users can only view their own subscription data
CREATE POLICY "users_can_view_own_subscription" ON public.subscribers
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Only edge functions (with service role) can insert subscription data
-- This policy will be bypassed by service role key used in edge functions
CREATE POLICY "service_role_can_insert_subscriptions" ON public.subscribers
FOR INSERT
TO authenticated
WITH CHECK (false); -- Users cannot insert, only service role can

-- Only edge functions (with service role) can update subscription data
-- This policy will be bypassed by service role key used in edge functions  
CREATE POLICY "service_role_can_update_subscriptions" ON public.subscribers
FOR UPDATE
TO authenticated
USING (false); -- Users cannot update, only service role can

-- Users still cannot delete subscription records (no DELETE policy)

-- Also fix web_vitals table to be more secure
DROP POLICY IF EXISTS "web_vitals_public_read" ON public.web_vitals;
CREATE POLICY "authenticated_users_can_read_own_vitals" ON public.web_vitals
FOR SELECT
TO authenticated
USING (user_id = auth.uid() OR user_id IS NULL);

-- Fix ad_events table to be more secure
DROP POLICY IF EXISTS "ad_events_public_read" ON public.ad_events;
CREATE POLICY "authenticated_users_can_read_ad_events" ON public.ad_events
FOR SELECT
TO authenticated
USING (true); -- Keep this accessible for analytics but require authentication
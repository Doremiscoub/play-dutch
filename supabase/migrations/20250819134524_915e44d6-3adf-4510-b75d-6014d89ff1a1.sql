-- Fix the security warning by recreating function with proper search_path
-- Need to drop policies first, then function, then recreate

-- Drop policies that depend on the function
DROP POLICY IF EXISTS "admins_can_manage_roles" ON public.user_roles;
DROP POLICY IF EXISTS "admins_can_view_ad_events" ON public.ad_events;

-- Now drop and recreate the function with proper search_path
DROP FUNCTION IF EXISTS public.has_role(_user_id UUID, _role app_role);

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Recreate the policies
CREATE POLICY "admins_can_manage_roles" ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "admins_can_view_ad_events" ON public.ad_events
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
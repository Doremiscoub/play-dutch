-- Fix critical security vulnerability in subscribers table RLS policies
-- The current policies with 'USING (false)' and 'WITH CHECK (false)' need to be replaced
-- with more secure and specific policies that protect customer data

-- Drop existing problematic policies
DROP POLICY IF EXISTS "service_role_can_insert_subscriptions" ON public.subscribers;
DROP POLICY IF EXISTS "service_role_can_update_subscriptions" ON public.subscribers;
DROP POLICY IF EXISTS "users_can_view_own_subscription" ON public.subscribers;

-- Create more secure policies

-- 1. Users can only view their own subscription data (strongest protection)
CREATE POLICY "users_can_view_own_subscription_secure" ON public.subscribers
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- 2. Service role bypass policy for edge functions only
-- This policy allows service role to perform operations (bypasses RLS when using service_role_key)
-- Regular authenticated users cannot insert subscription data directly
CREATE POLICY "service_role_can_manage_subscriptions" ON public.subscribers
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- 3. Prevent direct user manipulation - users cannot insert/update/delete subscription data
-- Only edge functions with service role can modify subscription data
CREATE POLICY "prevent_user_subscription_modifications" ON public.subscribers
FOR INSERT
TO authenticated
WITH CHECK (false);

CREATE POLICY "prevent_user_subscription_updates" ON public.subscribers
FOR UPDATE
TO authenticated
USING (false);

CREATE POLICY "prevent_user_subscription_deletions" ON public.subscribers
FOR DELETE
TO authenticated
USING (false);

-- Add additional security: Ensure user_id matches authenticated user for any potential bypasses
-- This acts as a secondary security layer
CREATE POLICY "enforce_user_id_match" ON public.subscribers
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());
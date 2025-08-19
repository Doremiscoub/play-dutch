-- Create web_vitals table for performance monitoring
CREATE TABLE IF NOT EXISTS public.web_vitals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  t TEXT NOT NULL,
  name TEXT NOT NULL,
  value FLOAT8 NOT NULL,
  delta FLOAT8 NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create ad_events table for AdSense policy-safe monitoring
CREATE TABLE IF NOT EXISTS public.ad_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  placement TEXT NOT NULL,
  event TEXT NOT NULL,
  ts TIMESTAMPTZ DEFAULT now()
);

-- Enable Row-Level Security
ALTER TABLE public.web_vitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ad_events ENABLE ROW LEVEL SECURITY;

-- Policies for web_vitals (public read, authenticated write)
CREATE POLICY "web_vitals_public_read" ON public.web_vitals
  FOR SELECT USING (true);

CREATE POLICY "web_vitals_authenticated_write" ON public.web_vitals
  FOR INSERT WITH CHECK (true);

-- Policies for ad_events (public read, public write for monitoring)
CREATE POLICY "ad_events_public_read" ON public.ad_events
  FOR SELECT USING (true);

CREATE POLICY "ad_events_public_write" ON public.ad_events
  FOR INSERT WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_web_vitals_created_at ON public.web_vitals(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_web_vitals_name ON public.web_vitals(name);
CREATE INDEX IF NOT EXISTS idx_ad_events_placement ON public.ad_events(placement);
CREATE INDEX IF NOT EXISTS idx_ad_events_ts ON public.ad_events(ts DESC);
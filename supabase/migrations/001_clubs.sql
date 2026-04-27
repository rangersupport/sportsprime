-- ============================================================
-- Migration 001: clubs table
-- Run in Supabase Dashboard → SQL Editor
-- ============================================================

CREATE TABLE IF NOT EXISTS clubs (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT        NOT NULL,
  slug        TEXT        NOT NULL UNIQUE,
  address     TEXT        NOT NULL DEFAULT '',
  city        TEXT        NOT NULL DEFAULT '',
  phone       TEXT,
  email       TEXT,
  plan        TEXT        NOT NULL DEFAULT 'basic'
                          CHECK (plan IN ('basic', 'pro', 'roboclub')),
  is_active   BOOLEAN     NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE clubs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active clubs"
  ON clubs FOR SELECT
  USING (is_active = true);

-- Seed: MACH Club, Cúcuta
INSERT INTO clubs (name, slug, address, city, phone, email, plan, is_active)
VALUES (
  'MACH Club',
  'mach',
  'Cúcuta, Norte de Santander',
  'Cúcuta',
  '+57 300 000 0000',
  'info@machclub.co',
  'pro',
  true
)
ON CONFLICT (slug) DO NOTHING;

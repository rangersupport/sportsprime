-- ============================================================
-- Migration 002: courts table
-- Run AFTER 001_clubs.sql
-- ============================================================

CREATE TABLE IF NOT EXISTS courts (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  club_id         UUID        NOT NULL REFERENCES clubs(id) ON DELETE CASCADE,
  name            TEXT        NOT NULL,
  sport_type      TEXT        NOT NULL,
  price_per_hour  INTEGER     NOT NULL,
  status          TEXT        NOT NULL DEFAULT 'available'
                              CHECK (status IN ('available', 'occupied', 'ending_soon', 'maintenance')),
  is_active       BOOLEAN     NOT NULL DEFAULT true,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE courts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active courts"
  ON courts FOR SELECT
  USING (is_active = true);

-- Seed: Padbol Norte and Padbol Sur for MACH Club
DO $$
DECLARE
  mach_id UUID;
BEGIN
  SELECT id INTO mach_id FROM clubs WHERE slug = 'mach';

  IF mach_id IS NULL THEN
    RAISE EXCEPTION 'MACH club not found — run 001_clubs.sql first';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM courts WHERE club_id = mach_id AND name = 'Padbol Norte') THEN
    INSERT INTO courts (club_id, name, sport_type, price_per_hour, status, is_active)
    VALUES (mach_id, 'Padbol Norte', 'padbol', 50000, 'available', true);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM courts WHERE club_id = mach_id AND name = 'Padbol Sur') THEN
    INSERT INTO courts (club_id, name, sport_type, price_per_hour, status, is_active)
    VALUES (mach_id, 'Padbol Sur', 'padbol', 50000, 'available', true);
  END IF;
END $$;

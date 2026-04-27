-- ============================================================
-- Migration 003: bookings table + seed data for today
-- Run AFTER 002_courts.sql
-- ============================================================

CREATE TABLE IF NOT EXISTS bookings (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  ref_code        TEXT        NOT NULL UNIQUE,
  court_id        UUID        NOT NULL REFERENCES courts(id) ON DELETE RESTRICT,
  player_name     TEXT        NOT NULL,
  player_phone    TEXT        NOT NULL,
  player_email    TEXT        NOT NULL,
  date            DATE        NOT NULL,
  start_time      TIME        NOT NULL,
  end_time        TIME        NOT NULL,
  duration_minutes INTEGER    NOT NULL DEFAULT 60,
  num_players     INTEGER     NOT NULL DEFAULT 2,
  subtotal        INTEGER     NOT NULL DEFAULT 0,
  iva             INTEGER     NOT NULL DEFAULT 0,
  total           INTEGER     NOT NULL DEFAULT 0,
  payment_method  TEXT        CHECK (payment_method IN ('nequi', 'daviplata', 'pse', 'card', 'cash')),
  payment_status  TEXT        NOT NULL DEFAULT 'pending'
                              CHECK (payment_status IN ('pending', 'approved', 'declined')),
  status          TEXT        NOT NULL DEFAULT 'pending'
                              CHECK (status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled')),
  notes           TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for fast availability checks
CREATE INDEX IF NOT EXISTS idx_bookings_court_date
  ON bookings (court_id, date);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Anyone can read bookings (for availability UI)
CREATE POLICY "Public can read bookings for availability"
  ON bookings FOR SELECT
  USING (true);

-- Anyone can insert a new booking
CREATE POLICY "Public can insert bookings"
  ON bookings FOR INSERT
  WITH CHECK (true);

-- Auto-update updated_at on every row update
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_bookings_updated_at ON bookings;
CREATE TRIGGER set_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- Seed: 3 demo bookings for today (idempotent)
-- ============================================================
DO $$
DECLARE
  norte_id UUID;
  sur_id   UUID;
  today    DATE := CURRENT_DATE;
BEGIN
  SELECT c.id INTO norte_id
    FROM courts c JOIN clubs cl ON cl.id = c.club_id
   WHERE cl.slug = 'mach' AND c.name = 'Padbol Norte';

  SELECT c.id INTO sur_id
    FROM courts c JOIN clubs cl ON cl.id = c.club_id
   WHERE cl.slug = 'mach' AND c.name = 'Padbol Sur';

  -- 1 — 09:00–10:00, Padbol Norte, Carlos Martínez, completed
  IF norte_id IS NOT NULL
     AND NOT EXISTS (SELECT 1 FROM bookings WHERE ref_code = 'SP-DEMO-001')
  THEN
    INSERT INTO bookings (
      ref_code, court_id, player_name, player_phone, player_email,
      date, start_time, end_time, duration_minutes, num_players,
      subtotal, iva, total, payment_method, payment_status, status
    ) VALUES (
      'SP-DEMO-001', norte_id, 'Carlos Martínez', '+57 311 234 5678', 'carlos@email.co',
      today, '09:00', '10:00', 60, 2,
      50000, 9500, 59500, 'nequi', 'approved', 'completed'
    );
  END IF;

  -- 2 — 11:00–12:00, Padbol Sur, Ana Rodríguez, completed
  IF sur_id IS NOT NULL
     AND NOT EXISTS (SELECT 1 FROM bookings WHERE ref_code = 'SP-DEMO-002')
  THEN
    INSERT INTO bookings (
      ref_code, court_id, player_name, player_phone, player_email,
      date, start_time, end_time, duration_minutes, num_players,
      subtotal, iva, total, payment_method, payment_status, status
    ) VALUES (
      'SP-DEMO-002', sur_id, 'Ana Rodríguez', '+57 320 456 7890', 'ana@email.co',
      today, '11:00', '12:00', 60, 4,
      50000, 9500, 59500, 'daviplata', 'approved', 'completed'
    );
  END IF;

  -- 3 — 14:00–15:00, Padbol Norte, Luis Fernando, confirmed
  IF norte_id IS NOT NULL
     AND NOT EXISTS (SELECT 1 FROM bookings WHERE ref_code = 'SP-DEMO-003')
  THEN
    INSERT INTO bookings (
      ref_code, court_id, player_name, player_phone, player_email,
      date, start_time, end_time, duration_minutes, num_players,
      subtotal, iva, total, payment_method, payment_status, status
    ) VALUES (
      'SP-DEMO-003', norte_id, 'Luis Fernando', '+57 315 678 9012', 'luis@email.co',
      today, '14:00', '15:00', 60, 2,
      50000, 9500, 59500, 'pse', 'approved', 'confirmed'
    );
  END IF;
END $$;

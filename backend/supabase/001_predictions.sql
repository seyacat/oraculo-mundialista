-- Create predictions table for per-user prediction persistence
-- Upserts on user_id (one row per user, storing full state as JSONB)

CREATE TABLE IF NOT EXISTS predictions (
  id              BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id         TEXT        NOT NULL UNIQUE,
  match_scores    JSONB       NOT NULL DEFAULT '{}'::jsonb,
  bracket_winner_ids JSONB   NOT NULL DEFAULT '{}'::jsonb,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_predictions_user_id ON predictions (user_id);

-- Auto-update updated_at on row modification
CREATE OR REPLACE FUNCTION update_predictions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_predictions_updated_at ON predictions;
CREATE TRIGGER trg_predictions_updated_at
  BEFORE UPDATE ON predictions
  FOR EACH ROW
  EXECUTE FUNCTION update_predictions_updated_at();

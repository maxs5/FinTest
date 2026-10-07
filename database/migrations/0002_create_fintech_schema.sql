CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'CUSTOMER',
  status TEXT NOT NULL DEFAULT 'ACTIVE',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT users_email_not_blank CHECK (btrim(email) <> ''),
  CONSTRAINT users_role_check CHECK (role IN ('CUSTOMER', 'SUPPORT', 'MANAGER', 'ADMIN')),
  CONSTRAINT users_status_check CHECK (status IN ('ACTIVE', 'BLOCKED', 'PENDING'))
);

CREATE UNIQUE INDEX users_email_lower_unique_idx
  ON users (lower(email));

CREATE TABLE accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  currency CHAR(3) NOT NULL,
  balance NUMERIC(20, 8) NOT NULL DEFAULT 0,
  available_balance NUMERIC(20, 8) NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'ACTIVE',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT accounts_currency_check CHECK (currency ~ '^[A-Z]{3}$'),
  CONSTRAINT accounts_balance_check CHECK (balance >= 0),
  CONSTRAINT accounts_available_balance_check CHECK (available_balance >= 0),
  CONSTRAINT accounts_available_lte_balance_check
    CHECK (available_balance <= balance),
  CONSTRAINT accounts_status_check CHECK (status IN ('ACTIVE', 'FROZEN', 'CLOSED')),
  CONSTRAINT accounts_user_currency_unique UNIQUE (user_id, currency)
);

CREATE INDEX accounts_user_id_idx ON accounts (user_id);

CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID NOT NULL REFERENCES accounts(id),
  type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'PENDING',
  direction TEXT NOT NULL,
  amount NUMERIC(20, 8) NOT NULL,
  currency CHAR(3) NOT NULL,
  balance_after NUMERIC(20, 8),
  reference TEXT,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  CONSTRAINT transactions_type_check
    CHECK (type IN ('TRANSFER', 'PAYMENT', 'EXCHANGE', 'DEPOSIT', 'WITHDRAWAL', 'FEE')),
  CONSTRAINT transactions_status_check
    CHECK (status IN ('PENDING', 'COMPLETED', 'FAILED', 'CANCELLED')),
  CONSTRAINT transactions_direction_check
    CHECK (direction IN ('DEBIT', 'CREDIT')),
  CONSTRAINT transactions_amount_check CHECK (amount > 0),
  CONSTRAINT transactions_currency_check CHECK (currency ~ '^[A-Z]{3}$'),
  CONSTRAINT transactions_balance_after_check
    CHECK (balance_after IS NULL OR balance_after >= 0)
);

CREATE INDEX transactions_account_created_idx
  ON transactions (account_id, created_at DESC);

CREATE INDEX transactions_status_idx ON transactions (status);

CREATE TABLE transfers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_account_id UUID NOT NULL REFERENCES accounts(id),
  destination_account_id UUID NOT NULL REFERENCES accounts(id),
  amount NUMERIC(20, 8) NOT NULL,
  currency CHAR(3) NOT NULL,
  status TEXT NOT NULL DEFAULT 'PENDING',
  idempotency_key TEXT NOT NULL,
  reference TEXT,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,
  CONSTRAINT transfers_different_accounts_check
    CHECK (source_account_id <> destination_account_id),
  CONSTRAINT transfers_amount_check CHECK (amount > 0),
  CONSTRAINT transfers_currency_check CHECK (currency ~ '^[A-Z]{3}$'),
  CONSTRAINT transfers_status_check
    CHECK (status IN ('PENDING', 'COMPLETED', 'FAILED', 'CANCELLED')),
  CONSTRAINT transfers_idempotency_key_not_blank
    CHECK (btrim(idempotency_key) <> ''),
  CONSTRAINT transfers_idempotency_key_unique UNIQUE (idempotency_key)
);

CREATE INDEX transfers_source_account_idx
  ON transfers (source_account_id, created_at DESC);

CREATE INDEX transfers_destination_account_idx
  ON transfers (destination_account_id, created_at DESC);

CREATE TABLE cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  account_id UUID NOT NULL REFERENCES accounts(id),
  card_type TEXT NOT NULL DEFAULT 'VIRTUAL',
  status TEXT NOT NULL DEFAULT 'ACTIVE',
  last4 CHAR(4),
  spending_limit NUMERIC(20, 8),
  daily_spent NUMERIC(20, 8) NOT NULL DEFAULT 0,
  currency CHAR(3) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT cards_type_check CHECK (card_type IN ('VIRTUAL')),
  CONSTRAINT cards_status_check CHECK (status IN ('ACTIVE', 'FROZEN', 'CLOSED')),
  CONSTRAINT cards_last4_check CHECK (last4 IS NULL OR last4 ~ '^[0-9]{4}$'),
  CONSTRAINT cards_spending_limit_check
    CHECK (spending_limit IS NULL OR spending_limit > 0),
  CONSTRAINT cards_daily_spent_check CHECK (daily_spent >= 0),
  CONSTRAINT cards_currency_check CHECK (currency ~ '^[A-Z]{3}$')
);

CREATE INDEX cards_user_id_idx ON cards (user_id);
CREATE INDEX cards_account_id_idx ON cards (account_id);

CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID NOT NULL REFERENCES accounts(id),
  card_id UUID REFERENCES cards(id),
  merchant_name TEXT NOT NULL,
  amount NUMERIC(20, 8) NOT NULL,
  currency CHAR(3) NOT NULL,
  status TEXT NOT NULL DEFAULT 'PENDING',
  idempotency_key TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  CONSTRAINT payments_merchant_not_blank CHECK (btrim(merchant_name) <> ''),
  CONSTRAINT payments_amount_check CHECK (amount > 0),
  CONSTRAINT payments_currency_check CHECK (currency ~ '^[A-Z]{3}$'),
  CONSTRAINT payments_status_check
    CHECK (status IN ('PENDING', 'COMPLETED', 'FAILED', 'CANCELLED')),
  CONSTRAINT payments_idempotency_key_not_blank
    CHECK (btrim(idempotency_key) <> ''),
  CONSTRAINT payments_idempotency_key_unique UNIQUE (idempotency_key)
);

CREATE INDEX payments_account_created_idx
  ON payments (account_id, created_at DESC);

CREATE TABLE exchange_rates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  base_currency CHAR(3) NOT NULL,
  quote_currency CHAR(3) NOT NULL,
  rate NUMERIC(20, 10) NOT NULL,
  fee_rate NUMERIC(10, 8) NOT NULL DEFAULT 0,
  effective_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT exchange_rates_base_currency_check
    CHECK (base_currency ~ '^[A-Z]{3}$'),
  CONSTRAINT exchange_rates_quote_currency_check
    CHECK (quote_currency ~ '^[A-Z]{3}$'),
  CONSTRAINT exchange_rates_different_currency_check
    CHECK (base_currency <> quote_currency),
  CONSTRAINT exchange_rates_rate_check CHECK (rate > 0),
  CONSTRAINT exchange_rates_fee_rate_check CHECK (fee_rate >= 0)
);

CREATE INDEX exchange_rates_pair_effective_idx
  ON exchange_rates (base_currency, quote_currency, effective_at DESC);

CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  read_at TIMESTAMPTZ,
  CONSTRAINT notifications_type_check
    CHECK (type IN ('TRANSACTION', 'TRANSFER', 'PAYMENT', 'SECURITY', 'SYSTEM')),
  CONSTRAINT notifications_title_not_blank CHECK (btrim(title) <> ''),
  CONSTRAINT notifications_message_not_blank CHECK (btrim(message) <> '')
);

CREATE INDEX notifications_user_created_idx
  ON notifications (user_id, created_at DESC);

CREATE INDEX notifications_unread_idx
  ON notifications (user_id, created_at DESC)
  WHERE is_read = FALSE;

CREATE TABLE audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  metadata JSONB NOT NULL DEFAULT '{}'::JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT audit_log_action_not_blank CHECK (btrim(action) <> ''),
  CONSTRAINT audit_log_entity_type_not_blank CHECK (btrim(entity_type) <> '')
);

CREATE INDEX audit_log_entity_idx
  ON audit_log (entity_type, entity_id, created_at DESC);

CREATE INDEX audit_log_user_created_idx
  ON audit_log (user_id, created_at DESC);

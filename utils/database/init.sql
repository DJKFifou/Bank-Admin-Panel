DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS accounts;
DROP TABLE IF EXISTS clients;

CREATE TABLE clients (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name text NOT NULL,
  last_name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE accounts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE,
  balance decimal(12,2) DEFAULT 0.00,
  name text NOT NULL,
  type text NOT NULL, -- e.g., 'checking', 'savings'
  created_at timestamptz DEFAULT now()
);

CREATE TABLE transactions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  account_id uuid REFERENCES accounts(id) ON DELETE CASCADE,
  source_account_id uuid REFERENCES accounts(id) ON DELETE SET NULL, -- for transfers
  amount decimal(12,2) NOT NULL,
  type text NOT NULL, -- 'withdraw', 'deposit', 'transfer'
  description text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE clients DISABLE ROW LEVEL SECURITY;
ALTER TABLE accounts DISABLE ROW LEVEL SECURITY;
ALTER TABLE transactions DISABLE ROW LEVEL SECURITY;
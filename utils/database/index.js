import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY
);

(async () => {
  console.log('⏳ Emptying database...');
  
  const { error: wipeErr } = await supabase
    .from('clients')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000');

  if (wipeErr) {
    return console.error('❌ Emptying failed:', wipeErr.message);
  } else {
    console.log('✅ Database is empty.');
  }

  console.log('⏳ Seeding database...');
  
  const { data: clients, error: cErr } = await supabase
    .from('clients')
    .insert([
      { first_name: 'Jean', last_name: 'Dupont' },
      { first_name: 'Marie', last_name: 'Curie' },
      { first_name: 'Linus', last_name: 'Torvalds' },
      { first_name: 'Ada', last_name: 'Lovelace' },
      { first_name: 'Satoshi', last_name: 'Nakamoto' }
    ])
    .select();

  if (cErr) {
    return console.error('❌ Seeding clients failed:', cErr.message);
  }

  const { data: accounts, error: aErr } = await supabase
    .from('accounts')
    .insert([
      { client_id: clients[0].id, balance: 2500.00, type: 'checking', name: 'Main Checking' }, 
      { client_id: clients[0].id, balance: 15000.00, type: 'savings', name: 'Emergency Fund' },
      { client_id: clients[1].id, balance: 450.50, type: 'checking', name: 'Everyday Checking' }, 
      { client_id: clients[2].id, balance: 0.99, type: 'checking', name: 'Basic Checking' },   
      { client_id: clients[3].id, balance: 120000.00, type: 'savings', name: 'Retirement Savings' },
      { client_id: clients[4].id, balance: 999999.99, type: 'checking', name: 'Primary Checking' }
    ])
    .select();

  if (aErr) {
    return console.error('❌ Seeding accounts failed:', aErr.message);
  }

  const { error: tErr } = await supabase
    .from('transactions')
    .insert([
      { account_id: accounts[0].id, amount: 1200.00, type: 'deposit', description: 'Monthly Salary' },
      { account_id: accounts[0].id, amount: 45.00, type: 'withdraw', description: 'Grocery Store' },
      { 
        account_id: accounts[0].id, 
        source_account_id: accounts[4].id, 
        amount: 500.00, 
        type: 'transfer', 
        description: 'Payment from Ada' 
      },
      { account_id: accounts[5].id, amount: 10000.00, type: 'deposit', description: 'Mining Reward' }
    ]);

  if (tErr) {
    return console.error('❌ Seeding transactions failed:', tErr.message);
  }

  console.log('✅ Database is seeded.');
})()
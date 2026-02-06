import database from '@/services/database';

export async function POST(request) {
  const {
    amount,
    account_id,
    description = ''
  } = await request.json();

  if (!amount || !account_id) {
    return Response.json(
      { error: 'Missing required fields' }, 
      { status: 400 }
    );
  }

  const { data: account } = await database
    .from('accounts')
    .select()
    .eq('id', account_id)
    .single();
  
  if (!account) {
    return Response.json(
      { error: 'Account not found' }, 
      { status: 400 }
    );
  }

  const { data, error } = await database
    .from('transactions')
    .insert([{ 
      account_id,
      amount, 
      type: 'deposit',
      description
    }])
    .select()
    .single();

  await database
    .from('accounts')
    .update({ balance: account.balance + amount })
    .eq('id', account_id);

  if (error) {
    return Response.json(
      { error: error.message }, 
      { status: 400 }
    );
  }

  return Response.json(
    data, 
    { status: 201 }
  );
}
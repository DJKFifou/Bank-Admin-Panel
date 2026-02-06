import database from '@/services/database';

export const GET = async (request) => {
  const { searchParams } = request.nextUrl;
  const clientId = searchParams.get('clientId');
  const accountId = searchParams.get('accountId');

  let query = database
    .from('transactions')
    .select();

  if (clientId) {
    query = query
      .eq('client_id', clientId);
  }

  if (accountId) {
    query = query
      .or(`account_id.eq.${accountId},source_account_id.eq.${accountId}`);
  }

  const { data, error } = await query;

  if (error) {
    return Response.json(
      { error: error.message },
      { status: 400 }
    );
  }
  
  return Response.json(
    data,
    { status: 200 }
  );
}
import database from '@/services/database';

export const GET = async (request) => {
  const { searchParams } = request.nextUrl;
  const clientId = searchParams.get('clientId');
  const type = searchParams.get('type');
  const search = searchParams.get('search');
  
  let query = database
    .from('accounts')
    .select();

  if (clientId) {
    query = query.eq('client_id', clientId);
  }

  if (type) {
    query = query.eq('type', type);
  }

  if (search) {
    query = query.ilike('name', `%${search}%`);
  }

  const { data, error } = await query;

  if (error) {
    return Response.json(
      { error: error.message }, 
      { status: 400 }
    );
  }

  return Response.json(data);
}

export async function POST(request) {
  const { name, type, client_id } = await request.json();

  if (!name || !type || !client_id) {
    return Response.json(
      { error: 'Missing required fields' }, 
      { status: 400 }
    );
  }

  const { data, error } = await database
    .from('accounts')
    .insert([{ name, type, client_id }])
    .select()
    .single();

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
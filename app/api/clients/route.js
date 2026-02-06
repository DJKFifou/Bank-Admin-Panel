import database from '@/services/database';

export const GET = async (request) => {
  const { searchParams } = request.nextUrl;
  const search = searchParams.get('search');
  
  let query = database
    .from('clients')
    .select();

  if (search) {
    query = query
      .or(`first_name.ilike.%${search}%,last_name.ilike.%${search}%`);
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
  const { first_name, last_name } = await request.json();

  if (!first_name || !last_name) {
    return Response.json(
      { error: 'Missing required fields' }, 
      { status: 400 }
    );
  }

  const { data, error } = await database
    .from('clients')
    .insert([{ first_name, last_name }])
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
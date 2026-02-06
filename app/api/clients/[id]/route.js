import database from '@/services/database';

export async function GET(request, { params }) {
  const { id } = await params;

  if (!id) {
    return Response.json(
      { error: 'ID is required' }, 
      { status: 400 }
    );
  }

  const { data, error } = await database
    .from('clients')
    .select()
    .eq('id', id)
    .single();

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

export async function PUT(request, { params }) {
  const { id } = await params;

  if (!id) {
    return Response.json(
      { error: 'ID is required' }, 
      { status: 400 }
    );
  }

  const { first_name, last_name } = await request.json();

  const { data, error } = await database
    .from('clients')
    .update({ first_name, last_name })
    .eq('id', id)
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
    { status: 200 }
  );
}

export async function DELETE(request, { params }) {
  const { id } = await params;

  if (!id) {
    return Response.json(
      { error: 'ID is required' }, 
      { status: 400 }
    );
  }

  const { error } = await database.from('clients').delete().eq('id', id);

  if (error) {
    return Response.json(
      { error: error.message }, 
      { status: 400 }
    );
  }

  return Response.json(
    { message: 'Client deleted' }, 
    { status: 200 }
  );
}
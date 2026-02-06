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
    .from('accounts')
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

  const { name, type }  = await request.json();

  const { data, error } = await database
    .from('accounts')
    .update({ name, type })
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

  const { error } = await database
    .from('accounts')
    .delete()
    .eq('id', id);

  if (error) {
    return Response.json(
      { error: error.message }, 
      { status: 400 }
    );
  }

  return Response.json(
    { message: 'Account deleted' }, 
    { status: 200 }
  );
}
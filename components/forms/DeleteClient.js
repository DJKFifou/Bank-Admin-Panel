export default function DeleteClient({ id }) {
  return (
    <form action={`/api/clients/${id}/delete`} method="post">
      <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer">
        Delete client
      </button>
    </form>
  );
}

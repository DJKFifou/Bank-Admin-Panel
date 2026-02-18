"use client";

export default function DeleteFormAccount({ id, client_id }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/accounts/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        window.location.href = `/client/${client_id}`;
      } else {
        const errorData = await res.json();
        alert(`Error deleting account: ${errorData.error}`);
      }
    } catch (error) {
      alert(`Error deleting account: ${error.message}`);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <button
        type="submit"
        className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
      >
        Delete account
      </button>
    </form>
  );
}

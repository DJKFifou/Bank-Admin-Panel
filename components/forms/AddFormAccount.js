"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const accountTypes = [
  { value: "checking", label: "Checking" },
  { value: "savings", label: "Savings" },
];

export default function AddFormAccount({ id }) {
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = {
      name: formData.get("name"),
      type: formData.get("type"),
      client_id: formData.get("client_id"),
    };

    try {
      const response = await fetch("/api/accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        e.target.reset();
        setMessage("Compte créé avec succès");
        router.refresh();
      } else {
        setMessage("Erreur lors de la création du compte");
      }
    } catch (error) {
      setMessage("Erreur réseau lors de la création du compte");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="font-bold text-xl">New account</p>
      <form
        onSubmit={handleSubmit}
        className="p-2 border rounded w-fit flex flex-col gap-4 bg-gray-100"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="name">Account name*</label>
          <input
            type="text"
            name="name"
            placeholder="Main checking"
            required
            className="bg-white p-2 rounded"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="type">Account type*</label>
          <select name="type" required className="bg-white p-2 rounded">
            {accountTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
        <input type="hidden" name="client_id" value={id} />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
        >
          Create account
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

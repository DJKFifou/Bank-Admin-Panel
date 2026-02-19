"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TransferMoneyForm({ accounts }) {
  const router = useRouter();
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const amount = formData.get("amount");
    const description = formData.get("description");
    const fromAccountId = formData.get("fromAccountId");
    const toAccountId = formData.get("toAccountId");

    try {
      const response = await fetch("/api/transactions/transfer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          account_id: toAccountId,
          source_account_id: fromAccountId,
          description,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to transfer money");
      }

      router.refresh();

      event.target.reset();
      setFromAccount("");
      setToAccount("");
    } catch (error) {
      setMessage("Error transferring money. Please try again.");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="font-bold text-xl">Transfer money</p>
      <form
        onSubmit={handleSubmit}
        className="p-2 border rounded w-fit flex flex-col gap-4 bg-gray-100"
      >
        <select
          name="fromAccountId"
          required
          className="border p-2 rounded bg-white"
          value={fromAccount}
          onChange={(e) => setFromAccount(e.target.value)}
        >
          <option value="">Select source account</option>
          {accounts.map((account) => (
            <option
              key={account.id}
              value={account.id}
              disabled={account.id === toAccount}
            >
              {account.name} - {account.type} : {account.balance}€
            </option>
          ))}
        </select>

        <select
          name="toAccountId"
          required
          className="border p-2 rounded bg-white"
          value={toAccount}
          onChange={(e) => setToAccount(e.target.value)}
        >
          <option value="">Select destination account</option>
          {accounts.map((account) => (
            <option
              key={account.id}
              value={account.id}
              disabled={account.id === fromAccount}
            >
              {account.name} - {account.type} : {account.balance}€
            </option>
          ))}
        </select>

        <div className="flex flex-col gap-1">
          <label htmlFor="amount">Amount to transfer*</label>
          <input
            type="number"
            name="amount"
            placeholder="500"
            required
            className="border p-2 rounded bg-white"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="description">Description*</label>
          <textarea
            type="text"
            name="description"
            placeholder="Rent for Ada"
            required
            className="border p-2 rounded bg-white min-h-20"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
        >
          Transfer Money
        </button>
      </form>
      {message && <p className="text-red-500">{message}</p>}
    </div>
  );
}

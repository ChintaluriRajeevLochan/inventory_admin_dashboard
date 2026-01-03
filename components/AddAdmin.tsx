"use client";

import { useState } from "react";

export default function AddAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e: any) {
    e.preventDefault();
    await fetch("/api/admins", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    setEmail("");
    setPassword("");
    alert("Admin added");
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <h3 className="font-semibold mb-4">Add New Admin</h3>
      <form onSubmit={submit} className="space-y-3">
        <input
          placeholder="Admin Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
        <button className="bg-indigo-600 text-white px-4 py-2 rounded">
          Create Admin
        </button>
      </form>
    </div>
  );
}

import { useState } from "react";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

export default function ExpenseForm({ refreshExpenses }) {
  const user = JSON.parse(localStorage.getItem("user"));

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("Food");
  const [dateTime, setDateTime] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!title || !amount || !dateTime) return alert("All fields required");

    await axios.post("/api/expenses", {
      title,
      amount: Number(amount),
      type,
      category,
      dateTime,
      userId: user.id,
    });

    setTitle("");
    setAmount("");
    setDateTime("");
    refreshExpenses();
  };

  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h3 className="text-lg font-semibold mb-4">Add Expense</h3>

      <form onSubmit={submitHandler} className="grid gap-3">
        <input
          className="border rounded px-3 py-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          className="border rounded px-3 py-2"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <div className="grid sm:grid-cols-2 gap-3">
          <select
            className="border rounded px-3 py-2"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          <select
            className="border rounded px-3 py-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Food</option>
            <option>Shopping</option>
            <option>Travel</option>
            <option>Party</option>
            <option>Bills</option>
          </select>
        </div>

        <input
          type="datetime-local"
          className="border rounded px-3 py-2"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
        />

        <button className="bg-blue-500 hover:bg-blue-600 text-white rounded py-2 font-semibold">
          Add
        </button>
      </form>
    </div>
  );
}

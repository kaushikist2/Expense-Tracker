import React, { useEffect, useState } from "react";
import { PlusCircle, Trash2, ArrowDownCircle, ArrowUpCircle } from "lucide-react";

export default function ExpenseTracker() {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense"); // income | expense
  const [date, setDate] = useState("");

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(entries));
  }, [entries]);

  const addEntry = () => {
    if (!title || !amount || !date) return;

    setEntries([
      ...entries,
      {
        id: Date.now(),
        title,
        amount: Number(amount),
        type,
        date,
      },
    ]);

    setTitle("");
    setAmount("");
    setDate("");
  };

  const removeEntry = (id) => {
    setEntries(entries.filter((e) => e.id !== id));
  };

  const income = entries
    .filter((e) => e.type === "income")
    .reduce((sum, e) => sum + e.amount, 0);

  const expense = entries
    .filter((e) => e.type === "expense")
    .reduce((sum, e) => sum + e.amount, 0);

  const balance = income - expense;

  const monthlySummary = entries.reduce((acc, entry) => {
    const month = entry.date.slice(0, 7); // YYYY-MM
    acc[month] = acc[month] || { income: 0, expense: 0 };
    acc[month][entry.type] += entry.amount;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-4 sm:p-6">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Expense Tracker</h1>

        {/* BALANCE */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-neutral-900 p-3 rounded-xl text-center">
            <ArrowUpCircle className="mx-auto text-green-400" />
            <p className="text-sm text-neutral-400">Income</p>
            <p className="font-bold">₹{income}</p>
          </div>
          <div className="bg-neutral-900 p-3 rounded-xl text-center">
            <ArrowDownCircle className="mx-auto text-red-400" />
            <p className="text-sm text-neutral-400">Expense</p>
            <p className="font-bold">₹{expense}</p>
          </div>
          <div className="bg-neutral-900 p-3 rounded-xl text-center">
            <p className="text-sm text-neutral-400">Balance</p>
            <p className={`font-bold ${balance >= 0 ? "text-green-400" : "text-red-400"}`}>
              ₹{balance}
            </p>
          </div>
        </div>

        {/* ADD ENTRY */}
        <div className="bg-neutral-900 p-4 rounded-2xl mb-6">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mb-2 p-2 rounded bg-neutral-800"
          />
          <input
            type="number"
            placeholder="Amount (₹)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full mb-2 p-2 rounded bg-neutral-800"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full mb-2 p-2 rounded bg-neutral-800"
          />

          <div className="flex gap-2 mb-3">
            <button
              onClick={() => setType("income")}
              className={`flex-1 py-2 rounded-xl ${type === "income" ? "bg-green-500 text-black" : "bg-neutral-800"}`}
            >
              Income
            </button>
            <button
              onClick={() => setType("expense")}
              className={`flex-1 py-2 rounded-xl ${type === "expense" ? "bg-red-500 text-black" : "bg-neutral-800"}`}
            >
              Expense
            </button>
          </div>

          <button
            onClick={addEntry}
            className="w-full flex items-center justify-center gap-2 bg-white text-black py-2 rounded-xl font-medium"
          >
            <PlusCircle /> Add Entry
          </button>
        </div>

        {/* LIST */}
        <div className="bg-neutral-900 p-4 rounded-2xl">
          <h2 className="text-xl font-semibold mb-3">History</h2>
          {entries.length === 0 && <p className="text-neutral-400">No records yet.</p>}

          {entries.map((entry) => (
            <div
              key={entry.id}
              className="flex justify-between items-center mb-3 border-b border-neutral-800 pb-2"
            >
              <div>
                <p className="font-medium">{entry.title}</p>
                <p className="text-xs text-neutral-400">{entry.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <p className={entry.type === "income" ? "text-green-400" : "text-red-400"}>
                  ₹{entry.amount}
                </p>
                <button onClick={() => removeEntry(entry.id)} className="text-red-400">
                  <Trash2 />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* MONTHLY SUMMARY */}
        <div className="mt-6 bg-neutral-900 p-4 rounded-2xl">
          <h2 className="text-xl font-semibold mb-3">Monthly Summary</h2>
          {Object.keys(monthlySummary).length === 0 && (
            <p className="text-neutral-400">No data yet.</p>
          )}

          {Object.entries(monthlySummary).map(([month, data]) => (
            <div key={month} className="flex justify-between text-sm mb-2">
              <span>{month}</span>
              <span className="text-green-400">+₹{data.income}</span>
              <span className="text-red-400">-₹{data.expense}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

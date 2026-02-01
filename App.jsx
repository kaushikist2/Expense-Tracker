import React, { useState } from "react";
import { PlusCircle, Trash2 } from "lucide-react";

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const addExpense = () => {
    if (!title || !amount) return;

    setExpenses([
      ...expenses,
      {
        id: Date.now(),
        title,
        amount: Number(amount),
      },
    ]);

    setTitle("");
    setAmount("");
  };

  const removeExpense = (id) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Expense Tracker</h1>

        {/* Add Expense */}
        <div className="bg-neutral-900 p-4 rounded-2xl mb-6">
          <input
            type="text"
            placeholder="Expense title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mb-3 p-2 rounded bg-neutral-800"
          />
          <input
            type="number"
            placeholder="Amount (₹)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full mb-3 p-2 rounded bg-neutral-800"
          />
          <button
            onClick={addExpense}
            className="w-full flex items-center justify-center gap-2 bg-white text-black py-2 rounded-xl font-medium"
          >
            <PlusCircle /> Add Expense
          </button>
        </div>

        {/* Expense List */}
        <div className="bg-neutral-900 p-4 rounded-2xl">
          <h2 className="text-xl font-semibold mb-4">Your Expenses</h2>

          {expenses.length === 0 && (
            <p className="text-neutral-400">No expenses added yet.</p>
          )}

          {expenses.map((expense) => (
            <div
              key={expense.id}
              className="flex justify-between items-center mb-3 border-b border-neutral-800 pb-2"
            >
              <div>
                <p className="font-medium">{expense.title}</p>
                <p className="text-sm text-neutral-400">₹{expense.amount}</p>
              </div>
              <button
                onClick={() => removeExpense(expense.id)}
                className="text-red-400 hover:text-red-500"
              >
                <Trash2 />
              </button>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="mt-6 text-center">
          <p className="text-lg font-semibold">Total Spent</p>
          <p className="text-2xl font-bold mt-1">₹{total}</p>
        </div>
      </div>
    </div>
  );
}

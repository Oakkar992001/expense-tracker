import { useState, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Header from "./components/Header";
function App() {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState("all");
  const filteredExpenses =
    filter === "all"
      ? expenses
      : expenses.filter((item) => item.type === filter);
  const [sort, setSort] = useState("newest");
  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    if (sort === "newest") {
      return new Date(b.date) - new Date(a.date);
    } else {
      return new Date(a.date) - new Date(b.date);
    }
  });

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);
  const income = expenses
    .filter((item) => item.type === "income")
    .reduce((acc, item) => acc + item.amount, 0);

  const expense = expenses
    .filter((item) => item.type === "expense")
    .reduce((acc, item) => acc + item.amount, 0);

  const balance = income - expense;
  function addExpense(expense) {
    setExpenses((prev) => [...prev, expense]);
  }

  function deleteExpense(id) {
    setExpenses((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <div>
      <Header />
      <h2>Balance: ${balance}</h2>
      <p>Income: ${income}</p>
      <p>Expense: ${expense}</p>
      <select onChange={(e) => setSort(e.target.value)}>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>
      <button onClick={() => setFilter("all")}>All</button>
      <button onClick={() => setFilter("income")}>Income</button>
      <button onClick={() => setFilter("expense")}>Expense</button>
      <ExpenseForm onAdd={addExpense} />
      <ExpenseList expenses={sortedExpenses} onDelete={deleteExpense} />
    </div>
  );
}

export default App;

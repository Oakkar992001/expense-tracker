export default function ExpenseItem({ expense, onDelete }) {
  return (
    <div>
      <h3>{expense.title}</h3>
      <p>${expense.amount}</p>
      <p>{expense.type}</p>
      <p>{expense.date}</p>

      <button onClick={() => onDelete(expense.id)}>Delete</button>
    </div>
  );
}

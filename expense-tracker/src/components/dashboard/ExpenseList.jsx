import ExpenseItem from "./ExpenseItem";

export default function ExpenseList({ expenses, refreshExpenses }) {
  if (expenses.length === 0) {
    return <p>No expenses added yet</p>;
  }

  return (
    <div>
      {expenses.map((item) => (
        <ExpenseItem
          key={item._id}
          item={item}
          refreshExpenses={refreshExpenses}
        />
      ))}
    </div>
  );
}

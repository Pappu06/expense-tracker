export default function BalanceCard({ expenses }) {
  let income = 0;
  let expense = 0;

  expenses.forEach((e) => {
    e.type === "income"
      ? (income += e.amount)
      : (expense += e.amount);
  });

  const balance = income - expense;

  return (
    <div className="rounded-xl shadow p-5 bg-linear-to-r from-blue-500 to-blue-400 text-white">
      <h2 className="text-lg font-semibold">Balance</h2>
      <p className="text-3xl font-bold mt-1">₹{balance}</p>

      <div className="flex justify-between mt-4 text-sm">
        <span className="text-green-200">
          Income: ₹{income}
        </span>
        <span className="text-red-200">
          Expense: ₹{expense}
        </span>
      </div>
    </div>
  );
}

import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

export default function ExpenseItem({ item, refreshExpenses }) {
  const user = JSON.parse(localStorage.getItem("user"));

  const deleteExpense = async () => {
    await axios.delete(
      `/api/expenses/${item._id}?userId=${user.id}`
    );
    refreshExpenses();
  };

  return (
    <div className="flex justify-between items-center border rounded-lg p-3 mb-2">
      <div>
        <h4 className="font-medium">{item.title}</h4>
        <p className="text-xs text-gray-500">
          {item.category} • {new Date(item.dateTime).toLocaleString()}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <span
          className={
            item.type === "income"
              ? "text-green-600 font-semibold"
              : "text-red-600 font-semibold"
          }
        >
          ₹{item.amount}
        </span>

        <button
          onClick={deleteExpense}
          className="text-red-500 hover:scale-110"
        >
          ❌
        </button>
      </div>
    </div>
  );
}

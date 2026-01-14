import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function MonthlyChart({ expenses }) {
  const monthlyExpenses = Array(12).fill(0);

  expenses.forEach((item) => {
    if (item.type === "expense") {
      const month = new Date(item.dateTime).getMonth();
      monthlyExpenses[month] += item.amount;
    }
  });

  const data = {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ],
    datasets: [
      {
        label: "Monthly Expenses (₹)",
        data: monthlyExpenses,
        backgroundColor: "#3b82f6",
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Monthly Expenses",
      },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 h-100">
      <Bar data={data} options={options} />
    </div>
  );
}

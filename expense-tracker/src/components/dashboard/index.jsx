/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";
import BalanceCard from "./BalanceCard";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import MonthlyChart from "./MonthlyChart";
import Homelayout from "../../layout/Homelayout";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/expenses?userId=${user.id}`
      );
      setExpenses(data.expenses || []);
    } catch {
      alert("Failed to load expenses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const initials = user.fullname
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Homelayout>
      <div>
        <div className="max-w-7xl mx-auto">

          {/* 3 COLUMN GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* LEFT: PROFILE */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow p-5 sticky top-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-lg font-bold">
                    {initials}
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg">
                      {user.fullname}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {user.role}
                    </p>
                  </div>
                </div>

                <hr className="my-4" />

                <div className="space-y-3 text-sm text-gray-700">
                  <p>
                    <span className="font-medium">Email</span><br />
                    {user.email}
                  </p>
                  <p>
                    <span className="font-medium">Mobile</span><br />
                    {user.mobile}
                  </p>
                </div>
              </div>
            </div>

            {/* CENTER: CORE DASHBOARD */}
            <div className="lg:col-span-6 space-y-6">
              <BalanceCard expenses={expenses} />
              <ExpenseForm refreshExpenses={fetchExpenses} />

              <div className="bg-white rounded-xl shadow p-5">
                <h3 className="text-lg font-semibold mb-3">
                  My Expenses
                </h3>

                {loading ? (
                  <p className="text-gray-500">Loading...</p>
                ) : (
                  <ExpenseList
                    expenses={expenses}
                    refreshExpenses={fetchExpenses}
                  />
                )}
              </div>
            </div>

            {/* RIGHT: CHART */}
            <div className="lg:col-span-3">
              <MonthlyChart expenses={expenses} />
            </div>

          </div>
        </div>
      </div>
    </Homelayout>
  );
}

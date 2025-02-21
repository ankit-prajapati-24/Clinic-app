import React, { useState, useEffect } from "react";
import { apiConnecter } from "../services/apiconnecter";
import ContactMessages from "../components/ContactMessages";
import LoadingPage from "../components/LoadingPage";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

const AdminDashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [revenueData, setRevenueData] = useState([]);
  const navigate = useNavigate();

  // Fetch transactions from API
  const fetchTransactions = async () => {
    try {
      const response = await apiConnecter("GET", `admin/transactions/all`);
      if (!response.status) {
        throw new Error("Failed to fetch transactions");
      }
      setTransactions(response.data);
      calculateRevenue(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to calculate total revenue per service
  const calculateRevenue = (transactions) => {
    const revenueMap = {};
    transactions.forEach((transaction) => {
      if (transaction.status === "Accepted") {
        if (!revenueMap[transaction.service]) {
          revenueMap[transaction.service] = 0;
        }
        revenueMap[transaction.service] += transaction.price || Math.round(Math.random()*50000); // Ensure price is counted
      }
    });

    // Convert to array format for charts
    const revenueArray = Object.keys(revenueMap).map((service) => ({
      name: service,
      revenue: revenueMap[service],
    }));

    setRevenueData(revenueArray);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Function to update transaction status
  const updateStatus = async (id, newStatus) => {
    try {
      const response = await apiConnecter(
        "PUT",
        `admin/transaction-update/${id}/${newStatus}`
      );
      toast.success("Successfully updated transaction status");

      // Refresh data after update
      fetchTransactions();
    } catch (err) {
      toast.error("Unable to change status of transaction");
      setError(err.message);
    }
  };

  // Colors for Pie Chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28CF2"];

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="p-6 bg-gray-100 min-h-screen">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Admin Dashboard - All Transactions
          </h1>

          {/* Transactions Table */}
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gmail</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slot</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4 text-sm text-gray-500">{transaction.transactionId}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{transaction.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{transaction.gmail}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{transaction.mobile}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{transaction.service}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{transaction.slot}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">₹{transaction.price || 0}</td>
                    <td className={`px-6 py-4 text-sm font-semibold text-center rounded-full ${
                        transaction.status === "Accepted" ? "bg-green-100 text-green-800"
                        : transaction.status === "Pending" ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                      }`}
                    >
                      {transaction.status}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={transaction.status}
                        onChange={(e) => updateStatus(transaction.transactionId, e.target.value)}
                        className="p-2 border rounded"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Service Revenue Analysis */}
          <div className="mt-8 p-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Service Revenue Analysis</h2>

            {/* Bar Chart */}
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#0088FE" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div className="w-full h-64 mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueData}
                    dataKey="revenue"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {revenueData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <ContactMessages />
        </div>
      )}
    </>
  );
};

export default AdminDashboard;

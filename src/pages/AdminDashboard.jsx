import React, { useState, useEffect } from "react";
import { apiConnecter } from "../services/apiconnecter";
import ContactMessages from "../components/ContactMessages";
import LoadingPage from "../components/LoadingPage";

const AdminDashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch transactions from the API
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await apiConnecter('GET',`admin/transactions/all`);
        console.log(response);
        // alert(response);
        if (!response.status) {
          throw new Error("Failed to fetch transactions");
        }
        setTransactions(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // Function to update transaction status
  const updateStatus = async (id, newStatus) => {
    try {

// https://clinic-639l.onrender.com/admin/transaction-update/{transactionId}/{status}


      const response = await apiConnecter('PUT',`admin/transaction-update/${id}/${newStatus}`);
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      // Update the local state to reflect the change
      setTransactions((prevTransactions) =>
        prevTransactions.map((transaction) =>
          transaction.id === id ? { ...transaction, status: newStatus } : transaction
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  // if (loading) {
  //   return <div className="p-6 text-center min-h-screen">Loading...</div>;
  // }

//   if (error) {
//     return <div className="p-6 text-center text-red-500">Error: {error}</div>;
//   }

  return (
   <>
   { loading?<LoadingPage></LoadingPage>: <div className="p-6 bg-gray-100 min-h-screen ">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <h1 className="text-2xl font-bold mb-6 text-center">All Transaction</h1>


      <div className="overflow-x-auto bg-white rounded-lg shadow ">
        <table className="min-w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gmail
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mobile
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Service
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Slot
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.gmail}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.mobile}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.service}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.slot}
                </td>
                <td    className={` flex p-2 mt-4 item-center  justify-center rounded-full text-xs font-semibold ${
                      transaction.status == 'Accepted'
                        ? 'bg-green-100 text-green-800': transaction.status == 'Pending'?" bg-yellow-100 text-yellow-800": 'bg-red-100 text-red-800'
                    }`}>
                  {transaction.status}
                </td>
              {
                transaction.status == "Pending" &&   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                
                <select
                  value={transaction.status}
                  onChange={(e) => updateStatus(transaction.transactionId, e.target.value)}
                  className="p-2 border rounded"
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td> 
              }
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ContactMessages/>
    </div>}
   </>
  );
};

export default AdminDashboard;
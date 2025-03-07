import React from 'react';
import Appointment from './Appointment ';

const TransactionTable = ({ 
  filteredTransactions, 
  searchTerm, 
  handleSearch, 
  updateStatus 
}) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-center">
        All Transactions
      </h1>
      
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by Transaction ID"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        />
      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gmail</th> */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slot</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredTransactions.length > 0 && filteredTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="px-6 py-4 text-sm text-gray-500">{transaction.transactionId}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{transaction.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{transaction.mobile}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{transaction.service}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{transaction.slot}</td>
                <td className="px-6 py-4 text-sm text-gray-500">₹{transaction.money || 0}</td>
                <td
                  className={`text-sm font-semibold text-center rounded-full ${
                    transaction.status === "Accepted"
                      ? "text-green-800"
                      : transaction.status === "Pending"
                      ? "text-yellow-800"
                      : "text-red-800"
                  }`}
                >
                  {transaction.status || "Rejected"}
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
                <td>
                    <Appointment status={transaction.status} email = {transaction.gmail}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredTransactions.length === 0 && (
          <div className="flex items-center justify-center text-center h-60">
            No Transaction Found
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionTable;
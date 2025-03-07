import React, { useState, useEffect } from "react";
import { apiConnecter } from "../services/apiconnecter";
import ContactMessages from "../components/ContactMessages";
import LoadingPage from "../components/LoadingPage";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import RevenueAnalysis from "../components/RevenueAnalysis";
import TransactionTable from "../components/TransactionTable";
import { Mail, Phone, MapPin } from 'lucide-react';
import { useSelector } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";

const AdminDashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const token = useSelector((state) => state.User.token);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [revenueData, setRevenueData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [admin, setAdmin] = useState({});
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalService, setTotalService] = useState(0);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
    fetchAdminData();
    fetchTransactions();
    fetchServices();
  }, []);

  const fetchAdminData = async () => {
    try {
      const response = await apiConnecter('GET', `user/data/${token}`);
      setAdmin(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await apiConnecter("GET", `services/all`);
      if (!response.status) throw new Error("Failed to fetch user stats");
      setTotalService(response.data.length);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await apiConnecter("GET", `admin/transactions/all`);
      if (!response.status) throw new Error("Failed to fetch transactions");
      setTransactions(response.data);
      const uniqueUsers = new Set(response.data.map(transaction => transaction.gmail)).size;
      setTotalUsers(uniqueUsers);
      setFilteredTransactions(response.data);
      calculateRevenue(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const calculateRevenue = (transactions) => {
    const revenueMap = {};
    transactions.forEach((transaction) => {
      if (transaction.status === "Accepted") {
        if (!revenueMap[transaction.service]) {
          revenueMap[transaction.service] = 0;
        }
        revenueMap[transaction.service] += transaction.price || Math.round(Math.random() * 50000);
      }
    });
    const revenueArray = Object.keys(revenueMap).map((service) => ({
      name: service,
      revenue: revenueMap[service],
    }));
    setRevenueData(revenueArray);
  };

  if (loading) return <LoadingPage />;

  return (
    <div className="p-6 bg-gray-100 min-h-screen max-w-screen-lg mx-auto px-4 sm:px-6">
  {/* Admin Header */}
  <div
    className="bg-gradient-to-r w-full from-sky-600 to-sky-700 py-10 text-center text-white shadow-lg rounded-lg flex flex-col md:flex-row items-center"
    data-aos="fade-down"
  >
    {/* Admin Info */}
    <div className="flex flex-col items-center p-5 md:ml-3" data-aos="fade-right">
      <img
        className="h-24 w-24 sm:h-32 sm:w-32 rounded-full object-cover"
        src={`https://ui-avatars.com/api/?name=${admin.name}`}
        alt={admin.name}
      />
      <h2 className="mt-4 text-xl sm:text-2xl font-semibold text-gray-900">{admin.name}</h2>
      <p className="text-sm text-gray-500">{admin.role}</p>
      <div className="mt-4 w-full space-y-2">
        <div className="flex items-center text-gray-200 text-sm">
          <Mail className="h-5 w-5 mr-2" />
          <span>{admin.gmail}</span>
        </div>
        <div className="flex items-center text-gray-200 text-sm">
          <Phone className="h-5 w-5 mr-2" />
          <span>{admin.mobile || "91XXXXXXXXXX"}</span>
        </div>
        <div className="flex items-center text-gray-200 text-sm">
          <MapPin className="h-5 w-5 mr-2" />
          <span>{admin.location || "City Country"}</span>
        </div>
      </div>
    </div>
    
    {/* Dashboard Heading */}
    <div className="flex flex-col items-center md:items-start justify-center w-full mt-4 md:mt-0" data-aos="zoom-in">
      <h1 className="text-2xl sm:text-4xl font-bold">Admin Dashboard</h1>
      <p className="text-md sm:text-lg">Manage Users, Transactions & Services</p>
    </div>
  </div>

  {/* Stats Section */}
  <div className="bg-white rounded-lg shadow overflow-hidden mt-6" data-aos="fade-up">
    <div className="px-4 py-5 sm:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="p-4 bg-blue-500 text-white text-center rounded-lg shadow" data-aos="flip-left">
          <h3 className="text-lg font-bold">Total Users</h3>
          <p className="text-2xl">{totalUsers}</p>
        </div>
        <div className="p-4 bg-green-500 text-white text-center rounded-lg shadow" data-aos="flip-right">
          <h3 className="text-lg font-bold">Total Appointments</h3>
          <p className="text-2xl">{transactions.length}</p>
        </div>
        <div className="p-4 bg-red-500 text-white text-center rounded-lg shadow" data-aos="flip-up">
          <h3 className="text-lg font-bold">Total Services</h3>
          <p className="text-2xl">{totalService}</p>
        </div>
      </div>
    </div>
  </div>
<RevenueAnalysis revenueData={revenueData} />
      <TransactionTable
        filteredTransactions={filteredTransactions}
        searchTerm={searchTerm}
        handleSearch={(e) => setSearchTerm(e.target.value)}
        updateStatus={async (id, newStatus) => {
          try {
            await apiConnecter("PUT", `admin/transaction-update/${id}/${newStatus}`);
            toast.success("Successfully updated transaction status");
            fetchTransactions();
          } catch (err) {
            toast.error("Unable to change status of transaction");
            setError(err.message);
          }
        }}
      />
  <ContactMessages />
</div>

  );
};

export default AdminDashboard;

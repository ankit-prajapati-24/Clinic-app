import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Mail, Phone, MapPin, Loader2 } from 'lucide-react';
import UserTransactions from '../components/Transactions';
import { apiConnecter } from '../services/apiconnecter';
import { useSelector } from 'react-redux';

function Dashboard() {
  const [user, setUser] = useState(null);
  const token = useSelector((state) => state.User.token);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    const fetchUserData = async () => {
      try {
        const response = await apiConnecter('GET', `user/data/${token}`);
        const data = await response.data;
        const completeAppointments = data.history.filter(item => item.status === "Accepted").length;

        setUser({
          ...data,
          stats: [
            { label: "Appointments", value: data.history.length },
            { label: "Pending", value: data.history.length - completeAppointments },
            { label: "Completed", value: completeAppointments }
          ],
        });
      } catch (err) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-200 to-white">
        <Loader2 className="h-8 w-8 animate-spin text-sky-600" />
        <span className="ml-2 text-lg font-medium text-sky-700">Loading...</span>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-200 to-white">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-red-600">Error</h2>
          <p className="text-gray-600">{error || 'Failed to load user data'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-sky-200 to-white py-8 px-4">
      <div className="bg-gradient-to-r from-sky-600 to-sky-700 py-10 text-center text-white shadow-lg rounded-lg flex flex-col md:flex-row items-center md:items-center" data-aos="fade-up">
        <div className="flex flex-col items-center ml-6 p-5">
          <img className="h-24 w-24 md:h-32 md:w-32 rounded-full object-cover" src={`https://ui-avatars.com/api/?name=${user.name || user.gmail}`} alt={user.name} />
          <h2 className="mt-4 text-xl md:text-2xl font-semibold text-gray-900">{user.name}</h2>
          <p className="text-sm text-gray-200">{user.role}</p>
          <div className="mt-4 space-y-2 text-gray-300 text-sm">
            <div className="flex items-center"><Mail className="h-5 w-5 mr-2" /> {user.gmail}</div>
            <div className="flex items-center"><Phone className="h-5 w-5 mr-2" /> {user.mobile || "91XXXXXXXXXX"}</div>
            <div className="flex items-center"><MapPin className="h-5 w-5 mr-2" /> {user.location || "City, Country"}</div>
          </div>
        </div>
        <div className="text-center md:text-left md:ml-8  flex-grow flex flex-col  items-center justify-center w-full">
          <h1 className="text-3xl md:text-4xl font-bold">User Dashboard</h1>
          <p className="text-lg">Manage Reports, Transactions & History</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6" data-aos="zoom-in">
        {user.stats.map((stat, index) => (
          <div key={index} className="p-4 text-white text-center rounded-lg shadow" style={{ backgroundColor: ["#3b82f6", "#facc15", "#22c55e"][index] }}>
            <h3 className="text-lg font-bold">{stat.label}</h3>
            <p className="text-2xl">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-white rounded-lg shadow-lg p-6" data-aos="fade-up">
  <h3 className="text-2xl font-bold text-gray-900">Recent Reports</h3>
  {user.reports?.length ? (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      {user.reports.map((report, index) => (
        <div 
          key={index} 
          className="p-4 rounded-lg border border-gray-200 hover:bg-gray-50 flex flex-col space-y-2" 
          data-aos="fade-up"
        >
          <div className="flex flex-col gap-1">
            <h1 className="font-bold text-gray-700">Desc:</h1>
            <h4 className="text-sm font-medium text-gray-900">{report.description}</h4>
          </div>

          <div className="flex flex-col gap-1">
            <h1 className="font-bold text-gray-700">Medicines:</h1>
            <h4 className="text-sm font-medium text-gray-900">{report.medicines}</h4>
          </div>

          <p className="text-sm text-gray-500">{report.date}</p>
        </div>
      ))}
    </div>
  ) : (
    <div className="text-center text-gray-600 mt-4">No Reports Available</div>
  )}
</div>

      <UserTransactions showLabels={true} />

    </div>
  );
}

export default Dashboard;
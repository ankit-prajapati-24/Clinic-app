import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Mail, Phone, MapPin, FileText, Loader2 } from 'lucide-react';
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
        const CompleteAppointment = data.history.reduce((count, item) =>
          item.status === "Accepted" ? count + 1 : count, 0
        );

        setUser({
          ...data, stats: [
            { label: "Appointments", value: data.history.length },
            { label: "Pending", value: data.history.length - CompleteAppointment },
            { label: "Completed", value: CompleteAppointment }
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
    <div className="min-h-screen bg-gradient-to-br from-sky-200 to-white py-8 px-4">
      <div className="bg-gradient-to-r from-sky-600 to-sky-700 py-16 text-center text-white shadow-lg rounded-lg flex" data-aos="fade-up">
        <div className="flex flex-col items-center p-5 ml-3">
          <img className="h-32 w-32 rounded-full object-cover" src={`https://ui-avatars.com/api/?name=${user.name}`} alt={user.name} />
          <h2 className="mt-4 text-2xl font-semibold text-gray-900">
           {user.name}
          </h2>
          <p className="text-sm text-gray-500">{user.role}</p>
          <div className="mt-4 w-full space-y-3">
            <div className="flex items-center text-gray-200">
              <Mail className="h-5 w-5 mr-2" />
              <span className="text-sm">{user.gmail}</span>
            </div>
            <div className="flex items-center text-gray-200">
              <Phone className="h-5 w-5 mr-2" />
              <span className="text-sm">{user.mobile || "91XXXXXXXXXX"}</span>
            </div>
            <div className="flex items-center text-gray-200">
              <MapPin className="h-5 w-5 mr-2" />
              <span className="text-sm">{user.location || "City Country"}</span>
            </div>
          </div>
        </div>
        <div className="flex item-center justify-center flex-col w-full">
          <h1 className="text-4xl font-bold">User Dashboard</h1>
          <p className="text-lg">Manage Report, Transactions & history</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden mt-6" data-aos="zoom-in">
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="p-4 bg-blue-500 text-white text-center rounded-lg shadow" data-aos="fade-right">
              <h3 className="text-lg font-bold">{user.stats[0].label}</h3>
              <p className="text-2xl">{user.stats[0].value}</p>
            </div>
            <div className="p-4 bg-yellow-500 text-white text-center rounded-lg shadow" data-aos="fade-up">
              <h3 className="text-lg font-bold">{user.stats[1].label}</h3>
              <p className="text-2xl">{user.stats[1].value}</p>
            </div>
            <div className="p-4 bg-green-500 text-white text-center rounded-lg shadow" data-aos="fade-left">
              <h3 className="text-lg font-bold">{user.stats[2].label}</h3>
              <p className="text-2xl">{user.stats[2].value}</p>
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto mt-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6" data-aos="fade-up">
          <h3 className="text-lg font-medium text-gray-900">Recent Reports</h3>
          <div className="space-y-4 mt-4">
            <div className="flex items-center justify-between p-4 font-bold rounded-lg bg-sky-100">
              <div>Descriptions</div>
              <div>Medicines</div>
              <div>Dates</div>
            </div>
            {user.reports ? user.reports.map((report, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50" data-aos="fade-up">
                <h4 className="text-sm font-medium text-gray-900">{report.description}</h4>
                <div className="px-3 py-1 text-xs font-medium text-gray-800">{report.medicines}</div>
                <p className="text-sm text-gray-500">{report.date}</p>
              </div>
            )) : <div className=" bg-gradient-to-br from-sky-200 to-white py-8 px-4 flex item-center justify-center">
                   No Reports Available
            </div>}
          </div>
          <button className="mt-6 w-full bg-sky-600 text-white py-2 px-4 rounded-md hover:bg-sky-700 transition-colors">View All Reports</button>
        </div>
      </main>

      <UserTransactions data-aos="fade-up" />
    </div>
  );
}

export default Dashboard;

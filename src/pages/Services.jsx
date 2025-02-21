import React, { useEffect, useState } from 'react';
import 'aos/dist/aos.css'; // Import AOS CSS
import AOS from 'aos'; // Import AOS JS
import { apiConnecter } from '../services/apiconnecter';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import LoadingPage from '../components/LoadingPage';

const ServicePage = () => {
  const [loading,setLoading] = useState(true);
  const role = useSelector((state) => state.User.role); // Get user role from Redux
  const isLoggedIn = useSelector((state) => state.User.token); // Check if user is logged in
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  // Fetch all services
  const getServices = async () => {
    try {
      const response = await apiConnecter('GET', 'services/all');
      setLoading(false);
      console.log(response.data);
      setServices(response.data);

    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error('Failed to fetch services. Please try again.');
    }
  };

  // Handle service modification (for admin)
  const handleModifyService = (id) => {
    navigate(`/Services/modify-service/${id}`); // Navigate to modify service page
  };

  // Handle service booking (for users)
  const handleBookService = (serviceId) => {
    if (!isLoggedIn) {
      toast.error('Please log in to book a service.');
      navigate('/login'); // Redirect to login page if not logged in
    } else {
      navigate(`book-service/${serviceId}`); // Navigate to booking page
    }
  };

  async function handleDeleteService(serviceId){
         
     const toastId = toast.loading("Deleting......");
     try{
       
      const res = await apiConnecter("Delete",`services/delete-service/${serviceId}`);
      toast.dismiss(toastId);
      toast.success("Service deleted successfully");
    }
    catch(err){
      console.log(err);
      toast.dismiss(toastId);
      toast.error("Please try again");
     }
  }

  // Initialize AOS
  useEffect(() => {
    getServices();
    AOS.init({
      duration: 1000, // Animation duration
      once: true, // Whether animation should happen only once
    });
  }, []);

  useEffect(() => {
   
  }, [role])
  

  if(loading){
    return <LoadingPage/>
  }
  return (
    <div className="font-sans bg-gray-50 py-12">
      {/* Page Header */}
      <div className="text-center mb-12" data-aos="fade-up">
        <h1 className="text-4xl font-bold text-blue-900">Our Services</h1>
        <p className="text-lg text-gray-600 mt-2">Explore the services we offer at our clinic.</p>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
              data-aos="fade-up"
              data-aos-delay={index * 100} // Staggered delay for each card
            >
              {/* Service Image */}
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-48 object-cover"
              />

              {/* Service Details */}
              <div className="p-6">
                <h2 className="text-xl font-semibold text-blue-900 mb-2">{service.name}</h2>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">Doctor:</span> {service.docter}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">Duration:</span> {Math.floor(Math.random() * 20)} min
                </p>
                <p className="text-gray-600 mb-4">
                  <span className="font-medium">Price:</span> {service.price} ₹
                </p>

                {/* Buttons */}
                <div className="flex gap-2">
                  {role == 'admin' ? (
                    <>
                      <button
                        onClick={() => handleModifyService(service.id)}
                        className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition-colors"
                      >
                        Modify
                      </button>
                      <button
                        onClick={() => handleDeleteService(service.id)}
                        className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleBookService(service.id)}
                      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Book Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Service Button (for admin) */}
        {role === 'admin' && (
          <div className="mt-8 text-center">
            <button
              onClick={() => navigate('/services/Add')}
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
            >
              Add New Service
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicePage;
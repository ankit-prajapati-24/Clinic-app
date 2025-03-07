import React, { useEffect } from 'react';
import 'aos/dist/aos.css'; // Import AOS CSS
import AOS from 'aos'; // Import AOS JS

const LabAndMedicalPage = () => {
  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: true, // Whether animation should happen only once
    });
  }, []);

  return (
    <div className="font-sans bg-gradient-to-br from-sky-200 to-white">
      {/* Hero Section */}
      <div
        className="bg-gradient-to-r from-sky-600 to-sky-700 py-20 text-center text-white"
        data-aos="fade-down"
      >
        <h1 className="text-4xl font-bold mb-4">Shifa Medical And Lab</h1>
        <p className="text-lg">Quality Medicines & Trusted Lab.</p>
      </div>

      {/* Introduction Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">
            Welcome to Shifa Medical Store
          </h2>
          <p className="text-gray-600 text-lg">
            Your trusted destination for your healthcare needs. We pride ourselves on offering a wide range of high-quality, health products, and personal care items. Our knowledgeable staff is dedicated to providing exceptional service and guidance to help you make informed choices for your health. Visit us today and experience the Shifa in your well-being!
          </p>
        </div>

        {/* Medical Staff Section */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
          data-aos="fade-up"
        >
          <div className="bg-white rounded-lg shadow-md p-6 transform transition-transform hover:scale-105">
            <h3 className="text-xl font-bold text-blue-900 mb-4">Medical Staff</h3>
            <p className="text-gray-600">
              Our medical staff plays a crucial role in delivering top-notch healthcare services. They are committed to upholding the highest standards of patient care, ensuring each individual receives personalized treatment and support.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 transform transition-transform hover:scale-105">
            <img
              src="https://static.wixstatic.com/media/0856dd_eb298089abfd4077953e15d29605bd93~mv2.png"
              alt="Medical Staff"
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Administrative Roles Section */}
        <div className="bg-blue-50 py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12" data-aos="fade-up">
              <h2 className="text-3xl font-bold text-blue-900 mb-4">Your Trusted LAB</h2>
              <p className="text-gray-600 text-lg">
                Shifa Lab is committed to delivering precise and prompt diagnostic testing to enhance your health and wellness. With our advanced facilities and skilled professionals, we guarantee high-quality care tailored to your needs. We provide a comprehensive range of services, including routine blood tests and specialized screenings, ensuring we cater to your unique requirements. Rely on us for trustworthy results and outstanding service at all times.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabAndMedicalPage;
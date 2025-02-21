import React from 'react'
import namastemodel  from '../assets/namaste-model.png';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const HeroSection = () => {
  const navigate = useNavigate();
  const token = useSelector(state => state.User.token);

  function clickHandler(){
    if(!token) navigate("/login");
    else navigate("/services");
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 flex flex-row md:flex-row items-center">
    {/* Text Content */}
    <div className="w-full md:w-1/2 pr-8 mb-8 md:mb-0" data-aos="fade-right">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-sky-700 mb-6">
      Your Trusted Medical Partner in Hyderabad


      </h1>
      <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8">
      WELCOME TO
Shifa Clinic  </p>
      <div className="space-x-4 space-y-2">
      <button className="bg-gradient-to-r from-sky-600 to-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl hover:from-sky-700 hover:to-indigo-700 transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
      onClick={clickHandler}
      >
  Book Appointment
</button>
        <button className="bg-white text-sky-700 px-4 py-2 sm:px-6 sm:py-3 rounded-lg border border-sky-700 hover:bg-sky-50 transition duration-300 hover:bg-sky-500 hover:text-white cursor-pointer"  onClick={() => navigate("/LabAndMedicalPage")}>
          Explore
        </button>
      </div>
    </div>

    {/* Image (Model) */}
    <div className="w-full md:w-1/2" data-aos="fade-left">
      <img
        src={namastemodel}
        alt="Login Illustration"
        className="w-full max-h-96 h-auto object-contain rounded-lg"
        style={{
          animation: `float 6s infinite ease-in-out`,
        }}
      />
    </div>
  </div>
  )
}

export default HeroSection

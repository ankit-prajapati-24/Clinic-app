import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Services from './pages/Services';
import Team from './pages/Team';
import Blogs from './pages/Blog';
import Contact from './pages/Contact';
import Header from './components/Header';
import Footer from './components/Footer';
import NavBar from './components/Navbar';
import TheClinic from './pages/TheClinic';
import LabAndMedicalPage from './pages/medical-and-lab';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import VerifyOtp from './Auth/VerifyOtp';
import CreateBlog from './components/CreateBlog.jsx'
import UserTransactions from './components/Transactions';
import Dashboard from './pages/Dashboard';
import AddService from './pages/AddService';
import ModifyServicePage from './pages/ModifyServicePage';
import BookService from './pages/BookAppointment'
import ConfirmBooking from './pages/ConfirmBooking';
import AdminDashboard from './pages/AdminDashboard';
import Blog from './components/BlogCard';
import Chatbot from './services/Chatbot';
import ModifyBlog from './components/ModifyBlog.jsx';
function App() {
  return (
    <div className='w-screen border  m-0'>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/Add" element={<AddService />} />
        <Route path="/team" element={<Team />} />
        <Route path="/Services/modify-service/:id" element={<ModifyServicePage />} />
        <Route path="/Services/book-service/:id" element={<BookService/>} />
        <Route path="/confirm-booking/:id" element={<ConfirmBooking />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog/add" element={<CreateBlog />} />
        <Route path="/Blog/:id" element={<Blog />} />
        <Route path="/Blog/modify/:id" element={<ModifyBlog />} />
        <Route path="/ContactUs" element={<Contact />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Verify-otp" element={<VerifyOtp />} />
        <Route path="/ContactUs" element={<Contact />} />
        <Route path="/TheClinic" element={<TheClinic />} />
        <Route path="/LabAndMedicalPage" element={<LabAndMedicalPage />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/confirm-booking" element={<ConfirmBooking />} />
        {/* <Route path="/Chatbot " element={<Chatbot />} /> */}
      </Routes>
      <Footer />
      <Chatbot/>
    </div>
  );
}

export default App;
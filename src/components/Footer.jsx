import React from "react";
import clinicImage from "../assets/clinic-img.avif";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-sky-700 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Clinic Image & Address */}
          <div className="text-center md:text-left">
            <img src={clinicImage} alt="Clinic" className="w-48 h-48 mx-auto md:mx-0 rounded-md mb-4" />
            <h3 className="text-xl font-bold mb-2">Our Clinic</h3>
            <p className="text-gray-300">
              <span className="font-semibold">Address:</span> H.No: 2-4-639/C/102, Sunder Nagar, Kachiguda, Hyderabad, Telangana 500027
            </p>
            <p className="text-gray-300 mt-2">
              <span className="font-semibold">Phone:</span> 9676688021
            </p>
            <p className="text-gray-300 mt-2">
              <span className="font-semibold">Email:</span> <a href="mailto:Drsamee11@gmail.com" className="underline">Drsamee11@gmail.com</a>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition">Home</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white transition">Services</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition">About Us</Link></li>
              <li><Link to="/ContactUs" className="text-gray-300 hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          {/* Clinic Hours */}
          <div>
            <h3 className="text-xl font-bold mb-4">Clinic Hours</h3>
            <ul className="space-y-2 text-gray-300">
              <li><span className="font-semibold">Mon - Fri:</span> 9:00 AM - 6:00 PM</li>
              <li><span className="font-semibold">Sat:</span> 9:00 AM - 2:00 PM</li>
              <li><span className="font-semibold">Sun:</span> Closed</li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="https://facebook.com" className="text-gray-300 hover:text-white transition">
                🌐 Facebook
              </a>
              <a href="https://twitter.com" className="text-gray-300 hover:text-white transition">
                🐦 Twitter
              </a>
              <a href="https://linkedin.com" className="text-gray-300 hover:text-white transition">
                🔗 LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-sky-600 mt-8 pt-6 text-center">
          <p className="text-gray-300">&copy; {new Date().getFullYear()} Shifa Clinic. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

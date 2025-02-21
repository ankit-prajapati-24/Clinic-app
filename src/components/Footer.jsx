import React from "react";
import clinicImage from "../assets/clinic-img.avif";

const Footer = () => {
  return (
    <footer className="bg-sky-700 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Clinic Image & Address */}
          <div className="text-center md:text-left">
            <img src={clinicImage} alt="Clinic" className="w-48 h-48 mx-auto md:mx-0 rounded-md mb-4" />
            <h3 className="text-xl font-bold mb-2">Our Clinic</h3>
            <p className="text-gray-300">123 Health Street, Wellness City, WC 12345</p>
            <p className="text-gray-300 mt-2">
              <span className="font-semibold">Phone:</span> +1 (123) 456-7890
            </p>
            <p className="text-gray-300 mt-2">
              <span className="font-semibold">Email:</span> info@yourclinic.com
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-300 hover:text-white transition">Home</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-white transition">Services</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-white transition">About Us</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-white transition">Contact</a></li>
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
          <p className="text-gray-300">&copy; {new Date().getFullYear()} Your Clinic Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

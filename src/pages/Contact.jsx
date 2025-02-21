import React, { useState } from "react";
import contactmodel from "../assets/contact-model.png";
import { apiConnecter } from "../services/apiconnecter";
import toast from "react-hot-toast";

const ContactUs = () => {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    name: "",
    gmail: "",
    message: "",
    contact: "",
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const id = toast.loading("Waiting....");
    try {
      // Send form data to the backend API
      const response = await apiConnecter("POST","services/add/contact/user-data",formData);
       console.log(response);
       toast.dismiss(id);
       toast.success("Message has Sended Succesfully");
      
      // Clear the form after successful submission
      setFormData({
        name: "",
        gmail: "",
        message: "",
        contact: "",
      });

      // alert("Message sent successfully!");
    } catch (error) {

      console.error("Error:", error);
      toast.dismiss(id);
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <div id="contact" className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center">
        {/* Contact Form and Information */}
        <div className="w-full md:w-1/2 md:pr-8">
          <h2 className="text-3xl font-bold text-sky-700 mb-8">Contact Us</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="gmail" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="gmail"
                name="gmail"
                value={formData.gmail}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Contact Field */}
            <div>
              <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                Contact Number
              </label>
              <input
                type="text"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                placeholder="Enter your contact number"
                required
              />
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                placeholder="Enter your message"
                required
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-sky-700 text-white px-6 py-3 rounded-lg hover:bg-sky-800 transition duration-300"
              >
                Send Message
              </button>
            </div>
          </form>

          {/* Contact Information */}
          <div className="mt-8">
            <h3 className="text-xl font-bold text-sky-700 mb-4">Our Contact Info</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">
                <span className="font-semibold">Email:</span> info@digitaltokensystem.com
              </li>
              <li className="text-gray-600">
                <span className="font-semibold">Phone:</span> +1 (123) 456-7890
              </li>
              <li className="text-gray-600">
                <span className="font-semibold">Address:</span> 123 Tech Street, Innovation City, IC 12345
              </li>
            </ul>
          </div>
        </div>

        {/* Model (Image) on the Right - Hidden on Small Screens */}
        <div className="w-full md:w-1/2 mt-8 md:mt-0 hidden md:block">
          <img
            src={contactmodel} // Replace with your model image path
            alt="Contact Us"
            className="w-full max-w-md mx-auto rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
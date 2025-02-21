import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";

const Blog = () => {
  const { id } = useParams(); // Get the blog ID from the URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch blog data from the API
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        // Show loading toast
        const toastId = toast.loading("Fetching blog...");

        const response = await fetch(
          `https://clinic-639l.onrender.com/blogs/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch blog");
        }

        const data = await response.json();
        setBlog(data);

        // Update toast to success
      
        toast.dismiss(toastId);
      } catch (err) {
        setError(err.message);

        // Update toast to error
        toast.error("Failed to fetch blog. Please try again.", {
          autoClose: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  // Render loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-sky-700"></div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        Error: {error}
      </div>
    );
  }

  // Render blog details
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        {/* Blog Image */}
        <img
          src={blog.image}
          alt={blog.name}
          className="w-full h-96 object-cover rounded-lg mb-6"
        />

        {/* Blog Title */}
        <h1 className="text-3xl font-bold text-sky-700 mb-4">{blog.name}</h1>

        {/* Blog Description */}
        <p className="text-gray-700 mb-6">{blog.desc}</p>

        {/* Likes and Views */}
        <div className="flex space-x-6 text-gray-600">
          <div className="flex items-center">
            <span className="mr-2">❤️</span>
            <span>{blog.likes} Likes</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2">👁️</span>
            <span>{blog.views} Views</span>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      {/* <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      /> */}
    </div>
  );
};

export default Blog;
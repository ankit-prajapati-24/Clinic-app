import React, { useState } from "react";
import axios from "axios";
import { apiConnecter } from "../services/apiconnecter";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  // State to manage blog data
  const navigate = useNavigate();
  const [blog, setBlog] = useState({
    name: "",
    image: "",
    desc: "",
    likes: "",
    views: "",
    date: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((prevBlog) => ({
      ...prevBlog,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await apiConnecter("POST", "blogs/add", blog);
      toast.success("Blog created successfully!");
      console.log(response.data);
      navigate("/blogs");

      // Clear the form after successful submission
      setBlog({
        name: "",
        image: "",
        desc: "",
        likes: "",
        views: "",
        date: "",
      });
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("Failed to create blog.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Create a Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Blog Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Blog Title:</label>
          <input
            type="text"
            name="name"
            value={blog.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="Enter blog title"
            required
          />
        </div>

        {/* Blog Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Blog Image URL:</label>
          <input
            type="text"
            name="image"
            value={blog.image}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="Enter image URL"
            required
          />
        </div>

        {/* Blog Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description:</label>
          <textarea
            name="desc"
            value={blog.desc}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="Enter blog description"
            required
          ></textarea>
        </div>

        {/* Likes and Views */}
        {/* <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Likes:</label>
            <input
              type="number"
              name="likes"
              value={blog.likes}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Enter number of likes"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Views:</label>
            <input
              type="number"
              name="views"
              value={blog.views}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Enter number of views"
            />
          </div>
        </div> */}

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date:</label>
          <input
            type="text"
            name="date"
            value={blog.date}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="Enter date (e.g., 2023-10-15)"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
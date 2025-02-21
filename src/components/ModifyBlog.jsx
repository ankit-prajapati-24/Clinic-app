import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiConnecter } from '../services/apiconnecter';
import LoadingPage from '../components/LoadingPage';
import toast from 'react-hot-toast';

const ModifyBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    desc: '',
    image: '',
  });

  // Fetch blog details
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await apiConnecter('GET', `blogs/${id}`);
        setBlog(response.data);
        setFormData({
          name: response.data.name,
          desc: response.data.desc,
          image: response.data.image,
        });
      } catch (err) {
        console.error('Error fetching blog:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    //   const response = await apiConnecter('PUT', `blogs/update/${id}`, formData);
    //   if (response.status) {
    // }
    toast.success('Blog updated successfully!');
    navigate('/blogs');
    } catch (err) {
      console.error('Error updating blog:', err);
      alert('Failed to update blog. Please try again.');
    }
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="p-8 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Modify Blog</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
        {/* Blog Title */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Blog Description */}
        <div className="mb-4">
          <label htmlFor="desc" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="desc"
            name="desc"
            value={formData.desc}
            onChange={handleInputChange}
            rows="4"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Blog Image URL */}
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Update Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModifyBlog;
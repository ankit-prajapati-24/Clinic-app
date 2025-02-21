import React, { useEffect, useState } from 'react';
import 'aos/dist/aos.css'; // Import AOS CSS
import AOS from 'aos'; // Import AOS JS
import { apiConnecter } from '../services/apiconnecter';
import { useSelector } from 'react-redux';
import CreateBlog from '../components/CreateBlog';
import LoadingPage from '../components/LoadingPage';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const BlogCard = ({ img, title, desc, views, likeButton, id, role, onDelete, onModify }) => {
  const navigate = useNavigate();
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white" data-aos="fade-up" onClick={() => navigate(`/blog/${id}`)}>
      {/* Blog Image */}
      <img className="w-full h-48 object-cover" src={img} alt={title} />

      {/* Blog Content */}
      <div className="px-6 py-4">
        {/* Blog Title */}
        <h2 className="font-bold text-xl mb-2">{title}</h2>

        {/* Blog Description */}
        <p className="text-gray-700 text-base">{desc}</p>
      </div>

      {/* Blog Footer (Views and Like Button) */}
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Views Count */}
        <span className="text-gray-600 text-sm">
          👁️ {views} views
        </span>

        {/* Like Button */}
        <button
          className="flex items-center text-gray-600 hover:text-red-500 transition-colors"
          // onClick={likeButton.onClick}
        >
          {'❤️'} {/* Like icon (e.g., a heart) */}
          {/* <span className="ml-1">{likeButton.count}</span> */}
        </button>
      </div>

      {/* Admin Actions */}
      {role === 'admin' && (
        <div className="px-6 py-4 flex justify-end space-x-4">
          <button
            onClick={() => onModify(id)}
            className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Modify
          </button>
          <button
            onClick={() => onDelete(id)}
            className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};



const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const { role } = useSelector((state) => state.User);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch blogs from the API
  const getBlogs = async () => {
    try {
      const response = await apiConnecter('GET', 'blogs/all');
      console.log(response);
      setBlogs(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Delete a blog
  const handleDelete = async (id) => {
    const toastid =toast.loading("Deleting....");
    try {
      const response = await apiConnecter('DELETE', `blogs/delete/${id}`);
      toast.dismiss(toastid);
      toast.success("Deleted successfully ");
  
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
        // alert('Blog deleted successfully!');
  
    } catch (err) {
      toast.dismiss(toastid);
      console.error('Error deleting blog:', err);
      // toast.success("Deleted successfully ");
      toast.error('Failed to delete blog. Please try again.');
    }
  };

  // Navigate to modify blog page
  const handleModify = (id) => {
    navigate(`/blog/modify/${id}`);
  };

  // Initialize AOS
  useEffect(() => {
    getBlogs();
    AOS.init({
      duration: 1000, // Animation duration
      once: true, // Whether animation should happen only once
    });
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="p-8 bg-gray-50">
      {/* Page Header */}
      <div className="text-center mb-12" data-aos="fade-up">
        <h1 className="text-4xl font-bold text-blue-900">Our Blogs</h1>
        <p className="text-lg text-gray-600 mt-2">Explore the latest articles and insights.</p>
      </div>

      {/* Blogs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog, index) => (
          <BlogCard
            key={blog.id}
            img={blog.image}
            title={blog.name.substr(0, 100) + '....'}
            desc={blog.desc.substr(0, 200) + '....'}
            views={blog.views}
            likeButton={blog.likeButton}
            id={blog.id}
            role={role}
            onDelete={handleDelete}
            onModify={handleModify}
            data-aos="fade-up"
            data-aos-delay={index * 100} // Staggered delay for each card
          />
        ))}
      </div>

      {/* Add New Blog Button (Admin Only) */}
      {role === 'admin' && (
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/blog/add')}
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
          >
            Add New Blog
          </button>
        </div>
      )}
    </div>
  );
};

export default Blogs;
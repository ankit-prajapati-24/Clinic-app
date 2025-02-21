import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import namsastemodel from '../assets/contact-model.png';
import { apiConnecter } from '../services/apiconnecter';
import { setSignData, setToken, setuserdata, setRole } from '../slices/UserDataSlice';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (formData) => {
    console.log(formData);
    const toastid = toast.loading('Loading...');
    try {
      setLoading(true);

      if (formData.loginType === 'user') {
        const res = await apiConnecter(
          'GET',
          `user/login/${formData.Email}/${formData.Password}`,
          "",
          "",
          { gmail: formData.Email, password: formData.Password, loginType: formData.loginType }
        );

        console.log(res);

        if (res.data.rc === '00') {
          toast.success(`Login successful`);
        } else if (res.data.rc === '01') {
          toast.error(`Incorrect Password`);
          return;
        }

        const userInfo = await apiConnecter('GET', `user/data/${formData.Email}`);
        console.log(userInfo);

        dispatch(setToken(formData.Email));
        dispatch(setRole("user"));
        navigate('/');
      } 
      else {
        const res = await apiConnecter(
          'GET',
          `admin/login/${formData.Email}/${formData.Password}`,
          "",
          "",
          { gmail: formData.Email, password: formData.Password, loginType: formData.loginType }
        );

        console.log(res);

        if (res.data.rc === '00') {
          toast.success(`Login successful`);
        } else {
          toast.error(`You are not an administrator`);
          return;
        }

        dispatch(setToken(formData.Email));
        dispatch(setRole("admin"));
        navigate('/admin-dashboard');
      }
    } catch (err) {
      console.error(err, 'Error sending OTP');
      toast.error('Error sending OTP. Please try again.');
    } finally {
      toast.dismiss(toastid);
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen from-sky-400 to-blue-500">
      {/* Left Section - Doctor Model Image */}
      <div className="w-1/2 hidden items-center justify-center p-8 md:flex">
        <img src={namsastemodel} alt="Doctor Model" className="rounded-lg" />
      </div>

      {/* Right Section - Login Form */}
      <div className="md:w-1/2 w-full flex items-center justify-center p-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg"
        >
          <h1 className="text-3xl font-bold text-center text-sky-800 mb-6">Login</h1>

          {/* Email Input */}
          <label className="block mb-4">
            <span className="text-gray-700">Email Address</span>
            <input
              type="text"
              {...register('Email', { required: true })}
              placeholder="Enter email address"
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </label>

          {/* Password Input */}
          <label className="block mb-4">
            <span className="text-gray-700">Password</span>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('Password', { required: true })}
                placeholder="Enter password"
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-3 cursor-pointer"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={20} className="text-gray-500" />
                ) : (
                  <AiOutlineEye fontSize={20} className="text-gray-500" />
                )}
              </span>
            </div>
          </label>

          {/* Login Type Dropdown */}
          <label className="block mb-4">
            <span className="text-gray-700">Login Type</span>
            <select
              {...register('loginType', { required: true })}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-sky-600 text-white py-2 rounded-md hover:bg-sky-700 transition duration-300"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          {/* Signup Link */}
          <div className="mt-4 text-center">
            <span className="text-gray-700">Don't have an account? </span>
            <Link to="/signup" className="text-sky-600 font-semibold hover:underline">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

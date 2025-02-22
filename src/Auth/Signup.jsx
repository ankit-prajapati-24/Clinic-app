import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import namsastemodel from '../assets/contact-model.png';
import { apiConnecter } from '../services/apiconnecter';
import { setSignData } from '../slices/UserDataSlice';

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (formData) => {
    const toastid = toast.loading('Loading...');

    try {
      setLoading(true);

      if (formData.Password !== formData.confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }

      const res = await apiConnecter('POST', `user/send-otp/${formData.Email}`);

      if (res.status === 201) {
        toast.error('User already exists');
        return;
      }

      dispatch(setSignData(formData));
      toast.success('OTP sent successfully');
      navigate('/Verify-otp');

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

      {/* Right Section - Signup Form */}
      <div className="md:w-1/2 w-full flex items-center justify-center p-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg"
        >
          <h1 className="text-3xl font-bold text-center text-sky-800 mb-6">Sign Up</h1>

          {/* Email Input */}
          <label className="block mb-4">
            <span className="text-gray-700">Name</span>
            <input
              type="Name"
              {...register('Name', { required: 'Name is required' })}
              placeholder="Enter Your Name"
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            {errors.Email && <p className="text-red-500 text-sm">{errors.Email.message}</p>}
          </label>
          <label className="block mb-4">
            <span className="text-gray-700">Email Address</span>
            <input
              type="email"
              {...register('Email', { required: 'Email is required' })}
              placeholder="Enter email address"
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            {errors.Email && <p className="text-red-500 text-sm">{errors.Email.message}</p>}
          </label>

          {/* Password Input */}
          <label className="block mb-4">
            <span className="text-gray-700">Create Password</span>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('Password', {
                  required: 'Password is required',
                  minLength: { value: 8, message: 'Password must be at least 8 characters' },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message: 'Password must include uppercase, lowercase, number, and special character',
                  },
                })}
                placeholder="Enter password"
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-3 cursor-pointer"
              >
                {showPassword ? <AiOutlineEyeInvisible fontSize={20} className="text-gray-500" /> : <AiOutlineEye fontSize={20} className="text-gray-500" />}
              </span>
            </div>
            {errors.Password && <p className="text-red-500 text-sm">{errors.Password.message}</p>}
          </label>

          {/* Confirm Password Input */}
          <label className="block mb-6">
            <span className="text-gray-700">Confirm Password</span>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                {...register('confirmPassword', {
                  required: 'Confirm password is required',
                  validate: value => value === watch('Password') || 'Passwords do not match',
                })}
                placeholder="Confirm password"
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-3 cursor-pointer"
              >
                {showConfirmPassword ? <AiOutlineEyeInvisible fontSize={20} className="text-gray-500" /> : <AiOutlineEye fontSize={20} className="text-gray-500" />}
              </span>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-sky-600 text-white py-2 rounded-md hover:bg-sky-700 transition duration-300"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

          {/* Login Link */}
          <div className="mt-4 text-center">
            <span className="text-gray-700">Already have an account? </span>
            <Link to="/Login" className="text-sky-600 font-semibold hover:underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;

import React, { useRef } from 'react';
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
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (formData) => {
    const toastid = toast.loading('Loading...');
    try {
      setLoading(true);

      if (formData.Password !== formData.confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }

      const res = await apiConnecter('POST', `user/send-otp/${formData.Email}`);
      console.log(res);

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
            <span className="text-gray-700">Email Address</span>
            <input
              type="email"
              {...register('Email', { required: true })}
              placeholder="Enter email address"
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </label>

          {/* Password Input */}
          <label className="block mb-4">
            <span className="text-gray-700">Create Password</span>
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

          {/* Confirm Password Input */}
          <label className="block mb-6">
            <span className="text-gray-700">Confirm Password</span>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                {...register('confirmPassword', { required: true })}
                placeholder="Confirm password"
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-3 cursor-pointer"
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible fontSize={20} className="text-gray-500" />
                ) : (
                  <AiOutlineEye fontSize={20} className="text-gray-500" />
                )}
              </span>
            </div>
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

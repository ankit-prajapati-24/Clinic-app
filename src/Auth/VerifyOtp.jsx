import { useState, useRef } from "react";
import toast, { Toaster } from 'react-hot-toast';
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from 'react-redux';
import { apiConnecter } from '../services/apiconnecter';
import { Link, useNavigate } from 'react-router-dom';

const VerifyOtp = () => {
  const ref = useRef();
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userform = useSelector((state) => state.User.SignData);
  const { Password, Email } = userform;

  const handleVerifyAndSignup = async (event) => {
    event.preventDefault();
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }

    setIsLoading(true);
    try {
      if (ref.current) {
        ref.current.continuousStart(); // Start the loading animation
      }
      const res = await apiConnecter("POST", "user/verify-otp",{
        "name":"",
        "gmail": Email,
        "password": Password,
        "name": null,
        "mobile": null,
        "history": [],
        "services": [],
        "age": null,
        "gender": null
      }
      ,"",{otp:otp});
      if (ref.current) {
        ref.current.complete(); // Complete the loading animation
      }
      toast.success("Signup successful!");
      navigate("/login");
    } catch (err) {
      if (ref.current) {
        ref.current.complete(); // Complete the loading animation
      }
      toast.error(err.response?.data?.message || "Please try again later.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    try {
      await apiConnecter("POST", "Auth/ResendOtp", { Email });
      toast.success("OTP resent successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to resend OTP. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
      {/* <LoadingBar color="red" ref={ref} /> */}
      <Toaster />

      {/* OTP Verification Form */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <p className="text-3xl font-semibold mb-6 text-center text-gray-800">Enter 6-Digit OTP</p>
        <form onSubmit={handleVerifyAndSignup} className="flex flex-col items-center">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderInput={(props) => (
              <input
                {...props}
                placeholder="-"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-[48px] lg:w-[60px] border-0 bg-gray-200 rounded-md text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
              />
            )}
            containerStyle={{
              justifyContent: "space-between",
              gap: "0 6px",
            }}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-yellow-500 py-3 px-4 hover:scale-95 rounded-md border border-black max-w-[200px] mt-6 font-medium text-richblack-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Verifying..." : "Verify Email"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-600">Didn't receive the OTP?</p>
          <button
            onClick={handleResendOtp}
            disabled={isLoading}
            className="text-blue-500 hover:text-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Resend OTP
          </button>
        </div>

        <div className="mt-6 text-center">
          <Link to="/login" className="text-blue-500 hover:text-blue-700 font-medium">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
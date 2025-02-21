import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { apiConnecter } from "../services/apiconnecter";

const ConfirmBooking = () => {
  const location = useLocation();
  const bookingData = location.state?.bookingData || {};
  const navigate = useNavigate();
  const bookingHandler = async() =>{ 
    try {
      var res = await apiConnecter("POST","user/transaction/add",bookingData);
      console.log(res);
      if(res.data.rc == '00'){
        toast.success("Appointment booked successfully!");
        navigate("/Dashboard");
      }
      else if(res.data.rc == '01'){
        toast.success(res.data.desc);
      navigate("/Dashboard");
      }
      
    } catch (err) {
      toast.error("Something went wrong");
      navigate("/Dashboard");
    } finally {
      // setIsSubmitting(false);
    }
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Confirm Your Booking</h1>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-medium">Transaction ID:</span>
            <span>{bookingData.transactionId}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Name:</span>
            <span>{bookingData.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Mobile:</span>
            <span>{bookingData.mobile}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Email:</span>
            <span>{bookingData.gmail}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Age:</span>
            <span>{bookingData.age}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Gender:</span>
            <span>{bookingData.gender}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Service:</span>
            <span>{bookingData.service}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Price:</span>
            <span>${bookingData.money}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Address:</span>
            <span>{bookingData.address}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Slot:</span>
            <span>{bookingData.slot}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Notes:</span>
            <span>{bookingData.notes}</span>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => bookingHandler()}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBooking;
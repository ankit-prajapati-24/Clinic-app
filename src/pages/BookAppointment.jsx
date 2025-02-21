import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import { QRCodeCanvas } from "qrcode.react";
import { apiConnecter } from "../services/apiconnecter";
import LoadingPage from "../components/LoadingPage";
import { useSelector } from "react-redux";

const defaultSlots = ["10:00 AM", "12:30 PM", "3:00 PM", "5:00 PM"];
  // UPI link for ₹200 payment to your UPI ID
  const upiPaymentLink = "upi://pay?pa=ankitjgj3@ybl&pn=Ankit&am=200&cu=INR";
const BookAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useSelector(state => state.User.token);
  const [service, setService] = useState(null);
  const [date, setDate] = useState(new Date());
  const [availability, setAvailability] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [transactionId, setTransactionId] = useState("");
  const [userDetails, setUserDetails] = useState({
    name: "",
    mobile: "",
    email: "",
    age: "",
    gender: "",
    price:"",
    address: "",
    service: "",
    notes: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultService = {
    name: "General Consultation",
    image: "https://via.placeholder.com/300",
    desc: "Book an appointment with our specialist doctors.",
    price: "₹500",
    doctor: "Dr. Arjun Verma",
    location: "Dewas, India",
  };

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await axios.get(`https://clinic-639l.onrender.com/services/${id}`);
        setService(response.data);
      } catch (err) {
        setService(defaultService);
        toast.error("Failed to fetch service details. Using default service.");
      } finally {
        setLoading(false);
      }
    };
    fetchServiceDetails();
    handleDateChange(new Date());
  }, [id]);

  const handleDateChange = async (newDate) => {
    setDate(newDate);
    try {
      const response = await axios.get(`https://clinic-639l.onrender.com/availability/${newDate.toISOString()}`);
      setAvailability(response.data.slots);
    } catch (err) {
      setError("Failed to fetch availability. Please try again.");
      setAvailability(defaultSlots);
    }
  };

  const handleSlotSelection = (slot) => {
    setSelectedSlot(slot);
    toast.success(`Selected slot: ${slot}`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleTransactionChange = (e) => {
    setTransactionId(e.target.value);
  };

  const handleBookingSubmit = async () => {
    if (!selectedSlot || !transactionId) {
      toast.error("Please select a slot and enter a valid transaction ID.");
      return;
    }

    const bookingData = {
      transactionId,
      name: userDetails.name || "Self",
      mobile: userDetails.mobile,
      gmail: token,
      age: userDetails.age,
      gender: userDetails.gender,
      money: service.price,
      notes: userDetails.notes,
      address: userDetails.address,
      service: userDetails.service || service.name,
      status: "pending",
    //   date: date.toISOString(),
      slot: `${selectedSlot} ${date.toDateString()}`,
    };

    setIsSubmitting(true);
    navigate("/confirm-booking", {
      state: { bookingData }, // Pass data as state
    });
    // try {
    //   await apiConnecter("POST","user/transaction/add",bookingData);
    //   toast.success("Appointment booked successfully!");
      // navigate("/Dashboard");
    // } catch (err) {
    //   toast.error("Failed to book appointment. Please try again.");
    // } finally {
    //   setIsSubmitting(false);
    // }
  };

  if (loading) {
    return <LoadingPage/>
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen sm:p-8">
      
      {/* {error && <p className="text-red-500 text-center mb-4">{error}</p>} */}

      <div className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row lg:flex-row   item-center justify-start mx-auto gap-12">
       
       <div>

       <h1 className="text-2xl font-bold text-blue-900 mb-6 sm:text-3xl">{service?.name || defaultService.name}</h1>
      <p className="text-lg text-gray-600 mb-4">{service?.desc || defaultService.desc}</p>
      <p className="text-lg text-gray-600 mb-4">{service?.doctor || defaultService.doctor}</p>
      <p className="text-lg text-gray-600 mb-4">{service?.price || defaultService.price}</p>
      <p className="text-lg text-gray-600 mb-4">{service?.location || defaultService.location}</p>

       </div>
       <div>
       <h2 className="text-xl font-semibold text-gray-800 mb-4">Select a Date and Time</h2>
        <p className="text-gray-600 mb-4">India Standard Time (IST)</p>

        <Calendar onChange={handleDateChange} value={date} />
       </div>

        <div className="mt-6 ml-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Available Slots</h3>
          <p className="text-gray-600">{date.toDateString()}</p>
          {availability.length > 0 ? (
            availability.map((slot, index) => (
              <button
                key={index}
                onClick={() => handleSlotSelection(slot)}
                aria-label={`Select slot ${slot}`}
                className={`w-full p-2 rounded-lg mt-2 transition-colors ${
                  selectedSlot === slot ? "bg-green-500 text-white" : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                {slot}
              </button>
            ))
          ) : (
            <p className="text-gray-600 mt-4">No availability for this date</p>
          )}
        </div>
      </div>

      {selectedSlot && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800">Scan & Pay</h3>
          <QRCodeCanvas value={upiPaymentLink} size={200}  className="mx-auto"/>

          <p className="text-gray-600">Scan this QR code to make the payment.</p>
        </div>
      )}

      {selectedSlot && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800">Enter Transaction ID</h3>
          <input
            type="text"
            placeholder="Transaction ID"
            value={transactionId}
            onChange={handleTransactionChange}
            className="w-full p-2 border rounded-lg mt-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      )}

      <PatientDetailsForm
        userDetails={userDetails}
        handleInputChange={handleInputChange} // Pass the function here
      />

      <button
        onClick={handleBookingSubmit}
        disabled={isSubmitting}
        className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 disabled:bg-gray-400"
      >
        {isSubmitting ? "Booking..." : "Next"}
      </button>
    </div>
  );
};

const PatientDetailsForm = ({ userDetails, handleInputChange }) => (
  <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-lg font-semibold text-gray-800">Patient Details</h3>
    <input
      type="text"
      name="name"
      placeholder="Full Name"
      value={userDetails.name}
      onChange={handleInputChange}
      className="w-full p-2 border rounded-lg mt-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
    <input
      type="text"
      name="mobile"
      placeholder="Mobile Number"
      value={userDetails.mobile}
      onChange={handleInputChange}
      className="w-full p-2 border rounded-lg mt-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
   
    <input
      type="number"
      name="age"
      placeholder="Age"
      value={userDetails.age}
      onChange={handleInputChange}
      className="w-full p-2 border rounded-lg mt-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />

    <input
      type="text"
      name="gender"
      placeholder="gender"
      value={userDetails.gender}
      onChange={handleInputChange}
      className="w-full p-2 border rounded-lg mt-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      // readOnly
    />
    <input
      type="text"
      name="address"
      placeholder="address"
      value={userDetails.address}
      onChange={handleInputChange}
      className="w-full p-2 border rounded-lg mt-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
    <textarea
      name="notes"
      placeholder="Additional Notes"
      value={userDetails.notes}
      onChange={handleInputChange}
      className="w-full p-2 border rounded-lg mt-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    ></textarea>
  </div>
);

export default BookAppointment;
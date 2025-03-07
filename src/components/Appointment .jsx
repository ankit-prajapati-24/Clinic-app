import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { apiConnecter } from "../services/apiconnecter";
const ReportModal = ({ email, onClose }) => {
  const [formData, setFormData] = useState({
    date: "",
    description: "",
    medicines: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const toastId = toast.loading("Please wait...");
    try {
      const response = await apiConnecter("POST",`user/reports/add/${email}`,formData);
      toast.dismiss(toastId);
      toast.success("Report added successfully");
      onClose();
    } catch (error) {
        toast.dismiss(toastId);
        toast.error("Try again later"); 
      console.error("Error submitting report:", error);
      alert("Failed to submit report.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-30 backdrop-blur-md shadow-lg">

      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Write Report</h2>

        <label className="block mb-2">Date:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        />

        <label className="block mb-2">Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        ></textarea>

        <label className="block mb-2">Medicines:</label>
        <input
          type="text"
          name="medicines"
          value={formData.medicines}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="bg-gray-400 px-4 py-2 rounded">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

const Appointment = ({ status, email }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className=" shadow-lg ">
     
      {status === "Accepted" && (
        <button
          onClick={() => setShowModal(true)}
          className="mt-3 bg-green-500 text-white px-4 py-2 rounded"
        >
          Write Report
        </button>
      )}

      {showModal && <ReportModal email={email} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Appointment;

import React, { useEffect, useState } from "react";
import { apiConnecter } from "../services/apiconnecter";
import { useParams, Link } from "react-router-dom";
import LoadingPage from "../components/LoadingPage";
import { FaEnvelope, FaMapMarkerAlt, FaStethoscope, FaHospital, FaPhone, FaUser, FaBirthdayCake, FaVenusMars } from "react-icons/fa";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const { gmail } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});
    const { token, UserData, role } = useSelector((state) => state.User);
//   alert(role)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiConnecter("GET", `${role}/data/${gmail}`);
        const { data } = await response;
        console.log(data);
        setUser(data);
        setEditedUser(data); // Initialize editedUser with fetched data
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load profile. Please try again.");
      }
    };

    fetchUserData();
  }, [gmail]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await apiConnecter("PUT", `user/data/${gmail}`, editedUser);
      const { data } = await response;
      setUser(data); // Update the user state with the new data
      setIsEditing(false); // Exit edit mode
      console.log("Profile updated successfully:", data);
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile. Please try again.");
    }
  };

  if (error) {
    return <div className="text-red-500 text-center mt-6">{error}</div>;
  }

  if (!user) {
    return <LoadingPage />;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg h-screen">
      {/* Transactions Link */}
      <div className="flex justify-between items-center mb-6">
        <Link
          to={`/dashboard`}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 flex items-center gap-2"
        >
          <FaStethoscope /> Check Transactions
        </Link>
        <div className="flex gap-4">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-2"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 flex items-center gap-2"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
            >
              Edit
            </button>
          )}
        </div>
      </div>

      {/* Profile Container */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Left Side - Profile Picture */}
        <div className="flex flex-col items-center">
          <img
            src={user.profilePicture || "https://th.bing.com/th/id/OIP.tvaMwK3QuFxhTYg4PSNNVAHaHa?rs=1&pid=ImgDetMain"}
            alt="Profile"
            className="w-32 h-32 rounded-full border border-gray-300"
          />
          <p className="text-gray-600 mt-2">{user.name}</p>
        </div>

        {/* Right Side - User Info */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
            <FaUser /> {user.name}
          </h2>
          <p className="text-gray-500 flex items-center gap-2">
            <FaEnvelope /> {user.gmail}
          </p>

          <div className="mt-4">
            <h3 className="text-lg font-medium">Profile Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 text-gray-700">
              <div className="flex items-center gap-2">
                <FaPhone /> <strong>Mobile:</strong>{" "}
                {isEditing ? (
                  <input
                    type="text"
                    name="mobile"
                    value={editedUser.mobile || ""}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded px-2 py-1"
                  />
                ) : (
                  user.mobile || "+91XXXXXXXXXX"
                )}
              </div>
              <div className="flex items-center gap-2">
                <FaBirthdayCake /> <strong>Age:</strong>{" "}
                {isEditing ? (
                  <input
                    type="text"
                    name="age"
                    value={editedUser.age || ""}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded px-2 py-1"
                  />
                ) : (
                  user.age || ""
                )}
              </div>
              <div className="flex items-center gap-2">
                <FaVenusMars /> <strong>Gender:</strong>{" "}
                {isEditing ? (
                  <select
                    name="gender"
                    value={editedUser.gender || "Male"}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded px-2 py-1"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  user.gender || "Male"
                )}
              </div>
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt /> <strong>Location:</strong>{" "}
                {isEditing ? (
                  <input
                    type="text"
                    name="location"
                    value={editedUser.location || ""}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded px-2 py-1"
                  />
                ) : (
                  user.location || "City, Country"
                )}
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
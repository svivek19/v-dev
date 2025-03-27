import React, { useEffect, useState } from "react";
import {
  FaBars,
  FaBirthdayCake,
  FaEdit,
  FaEnvelope,
  FaUserAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import { CiLogin, CiLogout } from "react-icons/ci";
import { Modal } from "antd";
import Axios from "../util/Axios";

const Navbar = ({ toggleSidebar }) => {
  const userId = localStorage.getItem("user");
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedDetails, setUpdatedDetails] = useState({
    name: "",
    age: "",
    email: "",
  });

  const handleProfileClick = () => {
    setIsModalOpen(true);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDetails({
      ...updatedDetails,
      [name]: value,
    });
  };

  const getUserDetails = async () => {
    try {
      const response = await Axios.get(`/user/get/${userId}`);
      setUpdatedDetails(response.data.response || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await Axios.patch(
        `/user/update/${updatedDetails.email}`,
        updatedDetails
      );
      getUserDetails();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    setIsEditing(false);
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <header className="bg-gray-900 text-white p-4 flex items-center justify-between shadow-md z-30">
      <button
        onClick={toggleSidebar}
        className="text-white text-2xl lg:hidden focus:outline-none"
      >
        <FaBars />
      </button>
      <Link
        to={"/home"}
        replace={true}
        className="text-3xl font-semibold bg-gradient-to-r from-yellow-500 to-green-500 bg-clip-text text-transparent"
      >
        V-DEV
      </Link>
      <div className="flex items-center space-x-6">
        <nav className="hidden lg:flex space-x-6">
          <Link to="/home" replace={true} className="hover:text-gray-400">
            Home
          </Link>

          {userId ? (
            <Link
              to="/roadmap-ai"
              replace={true}
              className="hover:text-gray-400"
            >
              Learning Guide
            </Link>
          ) : (
            <div className="relative group">
              <p className="hover:text-gray-400 cursor-help">Learning Guide</p>
              <div className="absolute left-0 top-full mb-2 hidden w-max bg-red-500 text-red-100 text-xs rounded-md px-2 py-1 group-hover:block">
                Login to explore
              </div>
            </div>
          )}
          {userId ? (
            <Link to="/ask" className="hover:text-gray-400">
              Ask
            </Link>
          ) : (
            <div className="relative group">
              <p className="hover:text-gray-400 cursor-help">Ask</p>
              <div className="absolute right-3 top-full mb-2 hidden w-max bg-blue-500 text-blue-100 text-xs rounded-md px-2 py-1 group-hover:block">
                Login to explore
              </div>
            </div>
          )}
        </nav>
        <div className="items-center flex gap-3">
          {userId && (
            <button className="cursor-pointer" onClick={handleProfileClick}>
              <RxAvatar size={30} />
            </button>
          )}

          {userId ? (
            <button
              className="cursor-pointer"
              onClick={handleLogout}
              title="logout"
            >
              <CiLogout size={30} />
            </button>
          ) : (
            <button
              className="cursor-pointer"
              onClick={() => navigate("/")}
              title="login"
            >
              <CiLogin size={30} />
            </button>
          )}
        </div>
      </div>

      <Modal
        title="Profile Details"
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={false}
      >
        <div className="bg-gradient-to-br from-gray-100 to-gray-300 text-black shadow-xl rounded-xl p-6 max-w-md mx-auto">
          <div className="space-y-6">
            {/* Name */}
            <div className="flex items-center justify-between border-b border-gray-700 pb-3">
              <div className="flex items-center space-x-3">
                <FaUserAlt size={22} className="text-gray-900" />
                <span className="font-medium text-gray-800">Name:</span>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={updatedDetails.name}
                    onChange={handleInputChange}
                    className="bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-blue-400 focus:outline-none rounded-md px-3 py-1 text-white"
                  />
                ) : (
                  <span className="capitalize text-gray-800">
                    {updatedDetails.name}
                  </span>
                )}
              </div>
              <button
                onClick={handleEditToggle}
                className="text-blue-400 hover:text-blue-500 transition duration-200"
              >
                <FaEdit size={18} />
              </button>
            </div>

            {/* Age */}
            <div className="flex items-center justify-between border-b border-gray-700 pb-3">
              <div className="flex items-center space-x-3">
                <FaBirthdayCake size={22} className="text-gray-900" />
                <span className="font-medium text-gray-800">Age:</span>
                {isEditing ? (
                  <input
                    type="number"
                    name="age"
                    value={updatedDetails.age}
                    onChange={handleInputChange}
                    className="bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-blue-400 focus:outline-none rounded-md px-3 py-1 text-white"
                  />
                ) : (
                  <span className="text-gray-800">{updatedDetails.age}</span>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center justify-between border-b border-gray-700 pb-3">
              <div className="flex items-center space-x-3">
                <FaEnvelope size={22} className="text-gray-900" />
                <span className="font-medium text-gray-800">Email:</span>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    disabled
                    value={updatedDetails.email}
                    onChange={handleInputChange}
                    className="bg-gray-700 border border-gray-600 rounded-md px-3 py-1 text-gray-500 cursor-not-allowed"
                  />
                ) : (
                  <span className="text-gray-800">{updatedDetails.email}</span>
                )}
              </div>
            </div>

            {/* Buttons */}
            {isEditing && (
              <div className="flex justify-end space-x-3 mt-4">
                <button
                  onClick={handleUpdate}
                  className="bg-blue-500 hover:bg-blue-600 transition text-white font-medium py-2 px-5 rounded-lg shadow-md"
                >
                  Update
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-600 hover:bg-gray-700 transition text-white font-medium py-2 px-5 rounded-lg shadow-md"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </header>
  );
};

export default Navbar;

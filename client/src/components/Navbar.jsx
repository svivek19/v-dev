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
          <Link to="/roadmap-ai" replace={true} className="hover:text-gray-400">
            Learning Guide
          </Link>
          {userId && (
            <Link to="/ask" className="hover:text-gray-400">
              Ask
            </Link>
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
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <FaUserAlt size={20} className="text-gray-600" />
            <span className="font-semibold">Name:</span>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={updatedDetails.name}
                onChange={handleInputChange}
                className="border px-2 py-1 rounded-md"
              />
            ) : (
              <span className="capitalize">{updatedDetails.name}</span>
            )}
            <button onClick={handleEditToggle} className="ml-2 text-blue-600">
              <FaEdit size={18} />
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <FaBirthdayCake size={20} className="text-gray-600" />
            <span className="font-semibold">Age:</span>
            {isEditing ? (
              <input
                type="number"
                name="age"
                value={updatedDetails.age}
                onChange={handleInputChange}
                className="border px-2 py-1 rounded-md"
              />
            ) : (
              <span>{updatedDetails.age}</span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <FaEnvelope size={20} className="text-gray-600" />
            <span className="font-semibold">Email:</span>
            {isEditing ? (
              <input
                type="email"
                name="email"
                disabled
                value={updatedDetails.email}
                onChange={handleInputChange}
                className="border px-2 py-1 rounded-md"
              />
            ) : (
              <span>{updatedDetails.email}</span>
            )}
          </div>

          {isEditing && (
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleUpdate}
                className="bg-blue-600 text-white py-2 px-4 rounded-md"
              >
                Update
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-400 text-white py-2 px-4 rounded-md cursor-pointer"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </Modal>
    </header>
  );
};

export default Navbar;

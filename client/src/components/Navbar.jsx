import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import { CiLogout } from "react-icons/ci";
import { Modal } from "antd";

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProfileClick = () => {
    setIsModalOpen(true);
  };

  const handleLogout = () => {
    alert("logout");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
        className="text-3xl font-semibold bg-gradient-to-r from-yellow-500 to-green-500 bg-clip-text text-transparent"
      >
        V-DEV
      </Link>
      <div className="flex items-center space-x-6">
        <nav className="hidden lg:flex space-x-6">
          <Link to="/home" className="hover:text-gray-400">
            Home
          </Link>
          <Link to="/ask" className="hover:text-gray-400">
            Ask
          </Link>
        </nav>
        <div className="items-center flex gap-3">
          <button className="cursor-pointer" onClick={handleProfileClick}>
            <RxAvatar size={30} />
          </button>
          <button className="cursor-pointer" onClick={handleLogout}>
            <CiLogout size={30} />
          </button>
        </div>
      </div>

      <Modal
        title="Profile Details"
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={false}
      >
        <p className="text-sm text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut
          tortor interdum, gravida leo in, interdum leo. Morbi malesuada massa
          eu neque suscipit, vel fermentum arcu luctus. Suspendisse potenti.
        </p>
      </Modal>
    </header>
  );
};

export default Navbar;

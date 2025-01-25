import React from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  return (
    <header className="bg-gray-900 text-white p-4 flex items-center justify-between shadow-md z-30">
      <button
        onClick={toggleSidebar}
        className="text-white text-2xl lg:hidden focus:outline-none"
      >
        <FaBars />
      </button>
      <h1 className="text-3xl font-semibold bg-gradient-to-r from-yellow-500 to-green-500 bg-clip-text text-transparent">
        V-DEV
      </h1>
      <div className="flex items-center space-x-6">
        <nav className="hidden lg:flex space-x-6">
          <Link to="/" className="hover:text-gray-400">
            Home
          </Link>
        </nav>
        <div>
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md">
            Login
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

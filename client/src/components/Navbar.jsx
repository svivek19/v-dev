import React from "react";
import { FaBars } from "react-icons/fa";

const Navbar = ({ toggleSidebar }) => {
  return (
    <header className="bg-gray-900 text-white p-4 flex items-center justify-between shadow-md z-30">
      <button
        onClick={toggleSidebar}
        className="text-white text-2xl lg:hidden focus:outline-none"
      >
        <FaBars />
      </button>
      <h1 className="text-xl font-semibold">V-DEV</h1>
      <nav className="hidden lg:flex space-x-6">
        <a href="#" className="hover:text-gray-400">
          Home
        </a>
        <a href="#" className="hover:text-gray-400">
          About
        </a>
        <a href="#" className="hover:text-gray-400">
          Services
        </a>
        <a href="#" className="hover:text-gray-400">
          Contact
        </a>
      </nav>
    </header>
  );
};

export default Navbar;

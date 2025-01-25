import React from "react";
import { IoClose } from "react-icons/io5";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-64 transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out z-40`}
    >
      <div className="p-4 text-lg font-bold border-b border-gray-700 flex items-center justify-between">
        <span>Logo</span>
        <button
          onClick={toggleSidebar}
          className="text-white text-2xl lg:hidden focus:outline-none"
        >
          <IoClose />
        </button>
      </div>
      <nav className="p-4">
        <ul className="space-y-4">
          <li>
            <a href="#" className="hover:text-gray-400">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-400">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-400">
              Services
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-400">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

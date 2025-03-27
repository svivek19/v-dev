import React from "react";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const userId = localStorage.getItem("user");
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-64 transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out z-40`}
    >
      <div className="p-4 text-lg font-bold border-b border-amber-300 flex items-center justify-between">
        <h1 className="text-3xl font-semibold">V-DEV</h1>
        <button
          onClick={toggleSidebar}
          className="text-white text-2xl lg:hidden focus:outline-none"
        >
          <IoClose />
        </button>
      </div>
      <nav className="p-4">
        <ul>
          <li className="flex flex-col gap-4">
            <Link
              to="/home"
              replace={true}
              className="hover:text-gray-400"
              onClick={toggleSidebar}
            >
              Home
            </Link>
            {userId ? (
              <Link
                to="/roadmap-ai"
                replace={true}
                className="hover:text-gray-400"
                onClick={toggleSidebar}
              >
                Learning Guide
              </Link>
            ) : (
              <div className="relative group">
                <p className="hover:text-gray-400 cursor-help">
                  Learning Guide
                </p>
                <div className="absolute right-3 top-full mb-2 hidden w-max bg-red-500 text-red-100 text-xs rounded-md px-2 py-1 group-hover:block">
                  Login to explore
                </div>
              </div>
            )}
            {userId ? (
              <Link
                to="/ask"
                replace={true}
                className="hover:text-gray-400"
                onClick={toggleSidebar}
              >
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
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

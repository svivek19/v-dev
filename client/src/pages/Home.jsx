import React from "react";
import { IoSearch } from "react-icons/io5";

const Home = () => {
  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 bg-[--bg-color]">
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-600 rounded-md px-10 py-1.5 w-full focus:outline-none"
          />
          <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <button className="absolute right-1 top-1/2 -translate-y-1/2 p-2 bg-orange-500 text-white rounded-lg">
            <IoSearch className="text-white font-bold" size={17} />
          </button>
        </div>{" "}
        {/* Main Content */}
        <div className="mt-4 border-b w-fit border-orange-500">
          <h1 className="text-lg font-bold text-orange-500">Community Forum</h1>
        </div>
      </div>
    </div>
  );
};

export default Home;

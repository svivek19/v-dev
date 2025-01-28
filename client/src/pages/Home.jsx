import React from "react";
import { IoSearch } from "react-icons/io5";
import QuestionAndAnswers from "../components/layouts/QuestionAndAnswers";

const Home = () => {
  return (
    <div className="w-full mx-auto px-4 bg-[--bg-color]">
      <div className="mx-auto">
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
        <div className="mt-4 mb-6 border-b w-fit border-orange-500">
          <h1 className="text-xl font-bold text-orange-500">Community Forum</h1>
        </div>
        <div className="w-full flex justify-center">
          <QuestionAndAnswers />
        </div>
      </div>
    </div>
  );
};

export default Home;

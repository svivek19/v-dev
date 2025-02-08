import React from "react";
import { IoSearch } from "react-icons/io5";
import QuestionAndAnswers from "../components/layouts/QuestionAndAnswers";

const Home = () => {
  return (
    <div className="w-full mx-auto p-4 bg-[--bg-color]">
      <div className="mx-auto">
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

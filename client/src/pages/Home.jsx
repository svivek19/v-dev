import React from "react";
import Typewriter from "typewriter-effect";

const Home = () => {
  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 bg-[--bg-color]">
      <div className="max-w-7xl mx-auto">
        <div className="text-base sm:text-lg md:text-xl lg:text-2xl">
          <h1 className="max-sm:text-2xl text-3xl font-bold mb-4">
            Welcome to{" "}
            <span className=" text-amber-500">
              <Typewriter
                options={{
                  strings: ["V-DEV Community"],
                  autoStart: true,
                  loop: true,
                }}
              />
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Home;

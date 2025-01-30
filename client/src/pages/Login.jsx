import React, { useState } from "react";
import logo from "../assets/logo.png";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isOtp, setIsOtp] = useState(false);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-96 flex flex-col items-center relative">
        {isOtp || isSignUp ? (
          <button
            className="absolute left-4 top-4 text-gray-600 hover:text-gray-800"
            onClick={() => {
              if (isOtp) setIsOtp(false);
              else setIsSignUp(false);
            }}
          >
            ← Back
          </button>
        ) : null}

        <img src={logo} alt="V-DEV Logo" className="w-32 mb-4" />
        <h1 className="text-xl font-semibold mb-6 text-gray-700 text-center">
          {isSignUp ? "Create your V-DEV Account" : "Sign in to access "}
          {!isSignUp && !isOtp && (
            <span className="text-blue-600">V-DEV Home</span>
          )}
          {isOtp && "Enter OTP to Continue"}
        </h1>

        {!isOtp && isSignUp && (
          <>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              min={0}
              max={15}
              placeholder="Age"
              className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </>
        )}

        {!isOtp && !isSignUp && (
          <input
            type="text"
            placeholder="Email address or mobile number"
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}

        {isOtp && (
          <>
            <input
              type="text"
              maxLength={6}
              placeholder="Enter 6-digit OTP"
              className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center tracking-widest"
            />
            <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition">
              Login
            </button>
          </>
        )}

        {!isOtp && (
          <button
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            onClick={() => setIsOtp(true)}
          >
            {isSignUp ? "Sign Up" : "Next"}
          </button>
        )}

        {!isOtp && (
          <p className="text-sm text-gray-600 mt-4">
            {isSignUp
              ? "Already have an account?"
              : "Don't have a V-DEV account?"}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? " Sign in" : " Sign up now"}
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;

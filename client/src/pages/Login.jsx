import React, { useEffect, useState } from "react";
import Axios from "../util/Axios";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const sendOtpApiUrl = "/auth/send-otp";
const verifyOtpApiUrl = "/auth/verify-otp";
const createUserApiUrl = "/user/create";

const Login = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isOtp, setIsOtp] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const handleSendOtp = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await Axios.post(sendOtpApiUrl, {
        email: loginEmail,
      });
      setSuccessMessage("OTP sent successfully!");
      setIsOtp(true);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await Axios.post(verifyOtpApiUrl, {
        email: loginEmail,
        otp: otp,
      });
      console.log(response);
      localStorage.setItem("user", response.data.response._id);
      setSuccessMessage("OTP verified successfully!");
      setTimeout(() => {
        navigate("/home", { replace: true });
      }, 1000);
    } catch (error) {
      setError(error.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await Axios.post(createUserApiUrl, {
        name,
        age,
        email: loginEmail,
      });
      setSuccessMessage("User created successfully!");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error || successMessage) {
      const timer = setTimeout(() => {
        setError("");
        setSuccessMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error, successMessage]);

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
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              onChange={(e) => setAge(e.target.value)}
              min={0}
              max={15}
              placeholder="Age"
              className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setLoginEmail(e.target.value)}
            />
          </>
        )}

        {!isOtp && !isSignUp && (
          <input
            type="text"
            onChange={(e) => setLoginEmail(e.target.value)}
            placeholder="Email address"
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
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
              onClick={handleVerifyOtp}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}

        {!isOtp && !isSignUp && (
          <button
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            onClick={handleSendOtp}
            disabled={loading}
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        )}

        {!isOtp && isSignUp && (
          <button
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            onClick={handleCreateUser}
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        )}

        {error && <p className="text-red-600 text-sm mt-4">{error}</p>}
        {successMessage && (
          <p className="text-green-600 text-sm mt-4">{successMessage}</p>
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

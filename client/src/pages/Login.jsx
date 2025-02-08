import React, { useEffect, useState } from "react";
import Axios from "../util/Axios";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaHouseChimneyUser } from "react-icons/fa6";

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
    <div className="w-full min-h-screen flex flex-col md:flex-row items-center justify-center">
      {/* Left Side (3D Object Section) */}
      <div className="w-full md:w-1/2 h-64 md:h-screen">
        <iframe
          src="https://my.spline.design/nexbotrobotcharacterconcept-d4734d5f02e6e320d0f5ad56aa2482d8/"
          className="w-full h-full"
        ></iframe>
      </div>

      {/* Right Side (Form Section) */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-4 relative">
        {isOtp || isSignUp ? (
          <button
            className="absolute left-0 right-80 top-4 text-gray-600 hover:text-gray-800"
            onClick={() => {
              if (isOtp) setIsOtp(false);
              else setIsSignUp(false);
            }}
          >
            ← Back
          </button>
        ) : null}

        <img src={logo} alt="V-DEV Logo" className="w-24 md:w-32 mb-4" />
        <h1 className="text-lg md:text-xl font-semibold mb-6 text-gray-700 text-center">
          {isSignUp ? "Create your V-DEV Account" : "Sign in to access "}
          {!isSignUp && !isOtp && (
            <span className="text-blue-600">V-DEV Home</span>
          )}
          {isOtp && "Enter OTP to Continue"}
        </h1>

        <div className="w-full max-w-sm">
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

          {!isOtp && (
            <button
              className={`w-full ${
                isSignUp ? "bg-blue-600" : "bg-blue-500"
              } text-white py-2 rounded-md hover:bg-blue-700 transition`}
              onClick={isSignUp ? handleCreateUser : handleSendOtp}
              disabled={loading}
            >
              {loading
                ? isSignUp
                  ? "Creating Account..."
                  : "Sending OTP..."
                : isSignUp
                ? "Sign Up"
                : "Send OTP"}
            </button>
          )}
        </div>

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
              className="text-blue-600 cursor-pointer hover:underline ml-1"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? "Sign in" : "Sign up now"}
            </span>
          </p>
        )}

        <Link to={"/home"}>
          <div className="flex items-center gap-2 bg-gray-200 duration-300 hover:bg-gray-300 cursor-pointer px-3 py-1 rounded-md mt-4">
            <p className="text-gray-800">Guest</p>
            <FaHouseChimneyUser className="text-gray-800" size={15} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Login;

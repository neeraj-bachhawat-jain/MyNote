import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Footer from "../Components/Footer";

export default function Signup() {
  const [userEmail, setUserEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !firstName ||
      !lastName ||
      !userEmail ||
      !phoneNumber ||
      !password ||
      !confirmPassword
    ) {
      toast.error("All fields are required");
      return;
    }
    if (phoneNumber.length !== 10) {
      toast.error("Phone number must be 10 digits");
      return;
    }
    // pasword pattern: at least one uppercase, one lowercase, one digit, one special character
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/;
    if (!passwordPattern.test(password)) {
      if (password.length < 6 || password.length > 20) {
        toast.error("Password must be between 6 and 20 characters");
        return;
      }
      toast.error(
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
      );
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    let payload = {
      firstname: firstName,
      lastname: lastName,
      userEmail,
      phoneNumber,
      password,
    };
    try {
      let res = await axios.post("http://localhost:5000/signup", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 201) {
        toast.success("Registration successful");
        navigate("/login");
      } else {
        toast.error("Registration failed");
      }
    } catch (err) {
        const message =
        err.response?.data?.message || "Registration failed";
        toast.error(message);
        console.error(err.response?.data);
}

  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 space-y-8">
      <Navbar />
      <div className="bg-gray-800 rounded-lg shadow-2xl mx-auto m-auto p-8 w-full max-w-md border border-gray-700">
        <h1 className="text-3xl font-bold mb-8 text-white text-center">
          Welcome Back
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full border border-gray-600 rounded-lg px-4 py-3 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full border border-gray-600 rounded-lg px-4 py-3 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>
            <input
              type="email"
              placeholder="Enter your email..."
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="w-full border border-gray-600 rounded-lg px-4 py-3 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            <input
              type="tel"
              maxLength="10"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full border border-gray-600 rounded-lg px-4 py-3 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-600 rounded-lg px-4 py-3 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-600 rounded-lg px-4 py-3 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold px-4 py-3 rounded-lg hover:bg-blue-600 transition duration-200 transform hover:scale-105"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-gray-400 mt-6">
          Do have an account?{" "}
          <Link to={"/login"} className="text-blue-400 hover:underline">
            login
          </Link>
        </p>
      </div>
      <Footer />
    </div>
  );
}

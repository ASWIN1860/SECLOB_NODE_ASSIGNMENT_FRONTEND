import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { signupApi, signinApi } from "../services/allApis";

function Authpage() {
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleRegister = async () => {
    const { username, email, password } = user;
    if (!username || !email || !password) {
      toast.info("Enter valid data!!!");
    } else {
      const response = await signupApi(user);
      if (response.status === 200) {
        toast.success("Signup successful");
        setUser({ username: "", email: "", password: "" });
        setIsSignup(false);
      } else {
        toast.error("Signup failed");
      }
    }
  };

  const handleLogin = async () => {
    const { email, password } = user;
    console.log(user);
    if (!email || !password) {
      toast.info("Enter Valid Inputs");
    } else {
      const response = await signinApi(user);
      console.log("full response",response)
      console.log("status",response?.status)
      console.log("data",response?.data)
      if (response.status === 200) {
        sessionStorage.setItem("token", response?.data?.token);
        toast.success("Signin Successful");
        setUser({ username: "", email: "", password });
        navigate("/home");
      } else {
        toast.error(response?.data);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-4xl h-[550px] bg-white rounded-xl shadow-2xl overflow-hidden flex">
        {/* Left Side */}
        <div
          className={`w-1/2 bg-[#003B5C] text-white flex flex-col justify-center items-center p-8 transition-all duration-500 ${
            isSignup ? "order-2" : "order-1"
          }`}
        >
          {isSignup ? (
            <>
              <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
              <p className="text-center mb-6">
                To keep connected with us please <br /> login with your personal info
              </p>

              <button
                onClick={() => setIsSignup(false)}
                className="border border-white px-8 py-2 rounded-full hover:bg-white hover:text-[#003B5C] transition"
              >
                Sign In
              </button>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold mb-4">Hello Friend!</h2>
              <p className="text-center mb-6">
                Enter your personal details and <br /> start your journey with us
              </p>

              <button
                onClick={() => setIsSignup(true)}
                className="border border-white px-8 py-2 rounded-full hover:bg-white hover:text-[#003B5C] transition"
              >
                Sign Up
              </button>
            </>
          )}
        </div>

        {/* Right Side Form */}
        <div
          className={`w-1/2 flex justify-center items-center p-8 ${
            isSignup ? "order-1" : "order-2"
          }`}
        >
          {!isSignup ? (
            <div className="w-full max-w-sm">
              <h2 className="text-3xl font-bold text-amber-500 text-center mb-6">
                Sign In to <br /> Your Account
              </h2>

              <input
                type="email"
                placeholder="Email"
                className="w-full  p-3 rounded bg-gray-200  mb-4"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                value={user.email}
                required
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full  p-3 rounded bg-gray-200 mb-4"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                value={user.password}
                required
              />

              <Link>
                <button onClick={handleLogin} className="w-full bg-amber-500 text-white py-3 rounded-full hover:bg-amber-600">
                  Login
                </button>
              </Link>
            </div>
          ) : (
            <div className="w-full max-w-sm">
              <h2 className="text-3xl font-bold text-amber-500 text-center mb-6">
                Create Account
              </h2>

              <input
                type="text"
                placeholder="Username"
                className="w-full  p-3 rounded  bg-gray-200 mb-4"
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                value={user.username}
                required
              />

              <input
                type="email"
                placeholder="Email"
                className="w-full  p-3 rounded  bg-gray-200 mb-4"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                value={user.email}
                required
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full  p-3 rounded bg-gray-200 mb-4"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                value={user.password}
                required
              />

              <button
                onClick={handleRegister}
                className="w-full bg-amber-500 text-white py-3 rounded-full hover:bg-amber-600"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Authpage;

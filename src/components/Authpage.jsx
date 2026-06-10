import React, { useState } from "react";
import { Link } from "react-router-dom";

function Authpage() {
  const [isSignup, setIsSignup] = useState(false);

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
              <h2 className="text-3xl font-bold mb-4">Hello Friend!</h2>
              <p className="text-center mb-6">
                Enter your details and start your journey with us.
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
              <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
              <p className="text-center mb-6">
                To keep connected with us please login.
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
            <form className="w-full max-w-sm">
              <h2 className="text-3xl font-bold text-amber-500 text-center mb-6">
                Sign In
              </h2>

              <input
                type="email"
                placeholder="Email"
                className="w-full  p-3 rounded mb-4"
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full  p-3 rounded mb-4"
              />

              <Link to={"/home"}>
                <button className="w-full bg-amber-500 text-white py-3 rounded-full hover:bg-amber-600">
                  Login
                </button>
              </Link>
            </form>
          ) : (
            <form className="w-full max-w-sm">
              <h2 className="text-3xl font-bold text-amber-500 text-center mb-6">
                Create Account
              </h2>

              <input
                type="text"
                placeholder="Username"
                className="w-full  p-3 rounded mb-4"
              />

              <input
                type="email"
                placeholder="Email"
                className="w-full  p-3 rounded mb-4"
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full  p-3 rounded mb-4"
              />

              <button className="w-full bg-amber-500 text-white py-3 rounded-full hover:bg-amber-600">
                Register
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Authpage;

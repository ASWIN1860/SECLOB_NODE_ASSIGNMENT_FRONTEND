import { useState } from "react";
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

  //Register
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

  //Login
  const handleLogin = async () => {
    const { email, password } = user;
    console.log(user);
    if (!email || !password) {
      toast.info("Enter Valid Inputs");
    } else {
      const response = await signinApi(user);
      console.log("full response", response);
      console.log("status", response?.status);
      console.log("data", response?.data);
      if (response.status === 200) {
        sessionStorage.setItem("token", response?.data?.token);
        sessionStorage.setItem("userId", response?.data?.userId);
        sessionStorage.setItem("username", response?.data?.username);
        toast.success("Signin Successful");
        setUser({ username: "", email: "", password });
        navigate("/home");
      } else {
        toast.error(response?.data);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4 py-6">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-2xl overflow-hidden">
        <div
          className={`flex flex-col md:flex-row min-h-[650px] md:min-h-[550px]`}
        >
          {/* LEFT PANEL */}

          <div
            className={`w-full md:w-1/2 bg-[#003B5C] text-white flex flex-col justify-center items-center p-8 md:p-12 transition-all duration-500 ${
              isSignup ? "md:order-2" : "md:order-1"
            }`}
          >
            {isSignup ? (
              <>
                <h2 className="text-2xl md:text-4xl font-bold mb-4 text-center">
                  Welcome Back!
                </h2>

                <p className="text-center text-sm md:text-base mb-6">
                  To keep connected with us please
                  <br />
                  login with your personal info
                </p>

                <button
                  onClick={() => setIsSignup(false)}
                  className="border border-white px-8 py-3 rounded-full hover:bg-white hover:text-[#003B5C] transition"
                >
                  Sign In
                </button>
              </>
            ) : (
              <>
                <h2 className="text-2xl md:text-4xl font-bold mb-4 text-center">
                  Hello Friend!
                </h2>

                <p className="text-center text-sm md:text-base mb-6">
                  Enter your personal details and
                  <br />
                  start your journey with us
                </p>

                <button
                  onClick={() => setIsSignup(true)}
                  className="border border-white px-8 py-3 rounded-full hover:bg-white hover:text-[#003B5C] transition"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* RIGHT PANEL */}

          <div
            className={`w-full md:w-1/2 flex justify-center items-center p-6 md:p-10 ${
              isSignup ? "md:order-1" : "md:order-2"
            }`}
          >
            {!isSignup ? (
              <div className="w-full max-w-md">
                <h2 className="text-2xl md:text-4xl font-bold text-amber-500 text-center mb-8">
                  Sign In to
                  <br />
                  Your Account
                </h2>

                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 rounded-lg bg-gray-200 mb-4 outline-none"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />

                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-3 rounded-lg bg-gray-200 mb-6 outline-none"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />

                <button
                  onClick={handleLogin}
                  className="w-full bg-amber-500 text-white py-3 rounded-full hover:bg-amber-600 transition"
                >
                  Login
                </button>
              </div>
            ) : (
              <div className="w-full max-w-md">
                <h2 className="text-2xl md:text-4xl font-bold text-amber-500 text-center mb-8">
                  Create Account
                </h2>

                <input
                  type="text"
                  placeholder="Username"
                  className="w-full p-3 rounded-lg bg-gray-200 mb-4 outline-none"
                  value={user.username}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      username: e.target.value,
                    })
                  }
                />

                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 rounded-lg bg-gray-200 mb-4 outline-none"
                  value={user.email}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      email: e.target.value,
                    })
                  }
                />

                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-3 rounded-lg bg-gray-200 mb-6 outline-none"
                  value={user.password}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      password: e.target.value,
                    })
                  }
                />

                <button
                  onClick={handleRegister}
                  className="w-full bg-amber-500 text-white py-3 rounded-full hover:bg-amber-600 transition"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Authpage;

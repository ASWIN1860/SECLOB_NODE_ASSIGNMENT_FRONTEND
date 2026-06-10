import React from "react";
import { FaCartArrowDown } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <div className="min-h-24 bg-gray-100">
        <nav className="bg-[#003B5C] text-white px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">ProductHub</h1>

          <input
            type="text"
            placeholder="Search Product"
            className="bg-white text-black px-4 py-2 rounded-md w-80"
          />

          <div className="flex gap-6 ">
            <Link to={'/home'}><button className="font-medium flex items-center gap-0.5"><FaHome />Home</button></Link>
            <button className="flex items-center gap-0.5 font-medium"><FaCartArrowDown />Cart</button>
            <button>Category</button>
            <button>Profile</button>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Header;

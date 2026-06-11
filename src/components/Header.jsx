import React, { useState, useEffect } from "react";
import { FaCartArrowDown, FaHome, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { CiViewList } from "react-icons/ci";
import { IoMdLogOut } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

function Header({ searchKey, setSearchKey }) {
  const [username, setUsername] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = sessionStorage.getItem("username");
    if (user) setUsername(user);
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <>
      <div className="min-h-18 bg-gray-100">
        <nav className="fixed w-full bg-[#003B5C] text-white z-40 px-4 md:px-8 py-3">
          {/* Top row */}
          <div className="flex justify-between items-center">
            <h1 className="text-lg md:text-2xl font-semibold">ProductManagement</h1>

            {/* Search - hidden on mobile, shown md+ */}
            <div className="hidden md:block">
              <input
                type="text"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                placeholder="Search Product"
                className="bg-white text-black px-4 py-2 rounded-md w-56 lg:w-80 font-semibold"
              />
            </div>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-4">
              <h1 className="flex items-center gap-1 font-bold text-sm">
                <FaUserCircle /> {username}
              </h1>
              <Link to="/home">
                <button className="font-medium flex items-center gap-1 cursor-pointer text-sm">
                  <FaHome /> Home
                </button>
              </Link>
              <Link to="/wishlist">
                <button className="flex items-center font-medium cursor-pointer text-sm">
                  <CiViewList /> Wishlist
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center text-red-400 font-medium cursor-pointer text-sm"
              >
                <IoMdLogOut /> Logout
              </button>
            </div>

            {/* Hamburger - mobile only */}
            <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>

          {/* Mobile search bar */}
          <div className="mt-2 md:hidden">
            <input
              type="text"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              placeholder="Search Product"
              className="bg-white text-black px-4 py-2 rounded-md w-full font-semibold"
            />
          </div>

          {/* Mobile menu dropdown */}
          {menuOpen && (
            <div className="md:hidden mt-3 flex flex-col gap-3 pb-2 border-t border-blue-700 pt-3">
              <h1 className="flex items-center gap-1 font-bold text-sm">
                <FaUserCircle /> {username}
              </h1>
              <Link to="/home" onClick={() => setMenuOpen(false)}>
                <button className="font-medium flex items-center gap-1 cursor-pointer text-sm">
                  <FaHome /> Home
                </button>
              </Link>
              <Link to="/wishlist" onClick={() => setMenuOpen(false)}>
                <button className="flex items-center font-medium cursor-pointer text-sm">
                  <CiViewList /> Wishlist
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center text-red-400 font-medium cursor-pointer text-sm w-fit"
              >
                <IoMdLogOut /> Logout
              </button>
            </div>
          )}
        </nav>
      </div>
    </>
  );
}

export default Header;


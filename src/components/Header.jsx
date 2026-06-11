import React,{ useState,useEffect } from "react";
import { FaCartArrowDown } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { CiViewList } from "react-icons/ci";
import { IoMdLogOut } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function Header({ searchKey, setSearchKey }) {
 
  const [username,setUsername]=useState('')
  const navigate = useNavigate();

  useEffect(()=>{
   const user=sessionStorage.getItem('username');
   if(user){
    setUsername(user)
   }
  },[])

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <>
      <div className="min-h-16 bg-gray-100">
        <nav className="fixed w-full bg-[#003B5C] text-white px-8 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">ProductManagement</h1>

          <div>
            <input
              type="text"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              placeholder="Search Product"
              className="bg-white text-black px-4 py-2 rounded-md w-80 font-semibold"
            />
          </div>

          <div className="flex ">
            <h1 className="flex items-center justify-center gap-1 font-bold"><FaUserCircle />{username}</h1>
          </div>

          <div className="flex gap-6 ">
            <Link to={"/home"}>
              <button className="font-medium flex items-center gap-0.5 cursor-pointer">
                <FaHome />
                Home
              </button>
            </Link>

            <Link to={'/wishlist'}>
              <button className="flex items-center font-medium cursor-pointer">
                <CiViewList />
                Wishlist
              </button>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center text-red-500 font-medium cursor-pointer"
            >
              <IoMdLogOut />
              Logout
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Header;

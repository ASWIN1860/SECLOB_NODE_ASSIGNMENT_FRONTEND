import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { getWishlistApi, removeWishlistApi } from "../services/allApis";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";

function Wishlist() {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);

  const getWishlist = async () => {
    try {
      const userId = sessionStorage.getItem("userId");
      const result = await getWishlistApi(userId);
      if (result.status === 200) {
        setWishlist(result.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);

  const handleRemove = async (id) => {
    try {
      const result = await removeWishlistApi(id);
      if (result.status === 200) {
        toast.success("Removed from Wishlist");
        getWishlist();
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to remove");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header/>
      <h1 className="flex  items-center gap-2 text-3xl font-bold mb-6 text-[#003B5C] ps-3"><FaHeart className="text-red-500 text-2xl"/> My Wishlist</h1>

      {wishlist.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-6 p-3">
          {wishlist.map((item) => (
            <div key={item._id} className="bg-white rounded-xl shadow-md p-4">
              <img
                src={item.productId?.imageUrl}
                alt="product_img"
                className="h-40 mx-auto object-contain"
              />

              <h2 className="font-semibold mt-4">{item.productId?.productName}</h2>

              <p className="text-yellow-600 font-bold mt-2">₹{item.productId?.variants?.[0]?.price}</p>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => navigate(`/productdetails/${item.productId?._id}`)}
                  className="flex-1 bg-[#003B5C] text-white py-2 rounded-lg cursor-pointer"
                >
                  View Details
                </button>

                <button onClick={() => handleRemove(item._id)} className="bg-red-500 text-white px-4 rounded-lg cursor-pointer">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-10 text-xl font-bold text-gray-500 mt-10">
          Your Wishlist is Empty
        </div>
      )}
    </div>
  );
}

export default Wishlist;

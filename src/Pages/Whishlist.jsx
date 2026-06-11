import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function Wishlist() {
  const navigate = useNavigate();

  const wishlist = [
    {
      _id: "1",
      productName: "HP Laptop",
      imageUrl: "https://pngimg.com/d/laptop_PNG5939.png",
      price: 52999,
    },
    {
      _id: "2",
      productName: "Dell Inspiron",
      imageUrl: "https://pngimg.com/d/laptop_PNG101816.png",
      price: 48999,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header/>
      <h1 className="text-3xl font-bold mb-6 text-[#003B5C] p-3">❤️ My Wishlist</h1>

      <div className="grid md:grid-cols-3 gap-6 p-3">
        {wishlist.map((item) => (
          <div key={item._id} className="bg-white rounded-xl shadow-md p-4">
            <img
              src={item.imageUrl}
              alt=""
              className="h-40 mx-auto object-contain"
            />

            <h2 className="font-semibold mt-4">{item.productName}</h2>

            <p className="text-yellow-600 font-bold mt-2">₹{item.price}</p>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => navigate(`/product-details/${item._id}`)}
                className="flex-1 bg-[#003B5C] text-white py-2 rounded-lg"
              >
                View Details
              </button>

              <button className="bg-red-500 text-white px-4 rounded-lg">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;

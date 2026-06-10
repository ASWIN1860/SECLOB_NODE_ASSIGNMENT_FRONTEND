import React from "react";
import { FaStar } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import Header from "../components/Header";

function ProductDetails() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <Header/>

      <div className="max-w-6xl mx-auto p-8">

        <div className="bg-white rounded-xl shadow-md p-8">

          <div className="grid md:grid-cols-2 gap-10">

            {/* Left Side */}
            <div>
              <img
                src="https://pngimg.com/d/laptop_PNG101816.png"
                alt=""
                className="w-full h-80 object-contain"
              />

              <div className="flex gap-4 mt-5 justify-around">
                <img
                  src="https://pngimg.com/d/laptop_PNG101816.png"
                  alt=""
                  className="w-20 h-20 border rounded p-2"
                />

                <img
                  src="https://pngimg.com/d/laptop_PNG101816.png"
                  alt=""
                  className="w-20 h-20 border rounded p-2"
                />
              </div>
            </div>

            {/* Right Side */}
            <div>

              <h2 className="text-3xl font-bold text-gray-800">
                HP 245 G9 Ryzen 5
              </h2>

              <div className="flex items-center gap-2 mt-3">
                <FaStar className="text-yellow-500" />
                <span>4.5 Rating</span>
              </div>

              <h3 className="text-4xl font-bold text-[#003B5C] mt-4">
                ₹52,999
              </h3>

              <p className="text-gray-600 mt-5 leading-7">
                HP 245 G9 Ryzen 5 Laptop with
                8GB RAM, 512GB SSD Storage,
                Full HD Display and Windows 11.
                Perfect for students and professionals.
              </p>

              <div className="mt-8 flex gap-4">

                <button className="bg-yellow-500 text-white px-8 py-3 rounded-lg font-semibold">
                  Edit product
                </button>

                <button className="bg-[#003B5C] text-white px-8 py-3 rounded-lg font-semibold">
                  Buy It Now
                </button>

                <button><CiHeart style={{fontSize:'30px'}}/></button>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default ProductDetails;
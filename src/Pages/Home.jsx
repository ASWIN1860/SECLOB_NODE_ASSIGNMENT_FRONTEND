import React from "react";
import Header from "../components/Header";

function Home() {
  const products = [
    {
      id: 1,
      name: "HP 245 G9 Ryzen 5",
      price: "₹52,999",
      image:
        "https://in-media.apjonlinecdn.com/catalog/product/cache/b3b166914d87ce343d4dc5ec5117b502/c/0/c08465059_1.png",
    },
    {
      id: 2,
      name: "Dell Inspiron",
      price: "₹48,999",
      image: "https://pngimg.com/d/laptop_PNG5939.png",
    },
    {
      id: 3,
      name: "Lenovo ThinkPad",
      price: "₹62,999",
      image: "https://pngimg.com/d/laptop_PNG101816.png",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Header />

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-white shadow-lg p-5">
          <ul className="space-y-5">
            <li className="font-semibold text-[#003B5C]">Dashboard</li>
            <li>Products</li>
            <li>Category</li>
            <li>Orders</li>
          </ul>
        </aside>

        {/* Products */}
        <main className="flex-1 p-8">
          <div className="flex justify-between mb-6">
            <h2 className="text-2xl font-bold">Products</h2>
            <div className="flex justify-end gap-3">
              <button className="bg-yellow-500 text-white px-5 py-2 rounded-lg">
                Add category
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {products.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-md p-4">
                <img
                  src={item.image}
                  alt=""
                  className="h-40 mx-auto object-contain"
                />

                <h3 className="font-semibold mt-3">{item.name}</h3>

                <p className="text-yellow-600 font-bold">{item.price}</p>

                <button className="mt-3 bg-[#003B5C] text-white w-full py-2 rounded-lg">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;

import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import {
  getAllProductsApi,
  getAllCategoriesApi,
  getAllSubCategoriesApi,
} from "../services/allApis";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [searchKey, setSearchKey] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getProducts = async () => {
    try {
      const result = await getAllProductsApi(
        searchKey,
        selectedSubCategory,
        page,
      );

      if (result.status === 200) {
        setProducts(result.data.products || result.data);
        setTotalPages(result.data.totalPages || 1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getCategories = async () => {
    try {
      const result = await getAllCategoriesApi();

      if (result.status === 200) {
        setCategories(result.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getSubCategories = async () => {
    try {
      const result = await getAllSubCategoriesApi();

      if (result.status === 200) {
        setSubCategories(result.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(searchKey)
    getCategories();
    getSubCategories();
  }, []);

  useEffect(() => {
    getProducts();
  }, [searchKey, selectedSubCategory, page]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header searchKey={searchKey} setSearchKey={setSearchKey} />

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-white shadow-lg p-5">
          <h2 className="font-bold text-lg mb-4">Categories</h2>

          <button
            onClick={() => {
              setSelectedSubCategory("");
              setPage(1);
            }}
            className="block mb-4 text-blue-600"
          >
            All Products
          </button>

          {categories.map((cat) => (
            <div key={cat._id} className="mb-4">
              <h3 className="font-semibold text-[#003B5C]">
                {cat.categoryName}
              </h3>

              {subCategories
                .filter((sub) => sub.categoryId?._id === cat._id)
                .map((sub) => (
                  <div
                    key={sub._id}
                    className="flex items-center gap-2 ml-4 mt-2"
                  >
                    <input
                      type="radio"
                      name="subcategory"
                      onChange={() => {
                        setSelectedSubCategory(sub._id);
                        setPage(1);
                      }}
                    />

                    <label>{sub.subCategoryName}</label>
                  </div>
                ))}
            </div>
          ))}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="flex justify-between mb-6">
            <h2 className="text-2xl font-bold">Products</h2>

            <button className="bg-yellow-500 text-white px-5 py-2 rounded-lg">
              Add Product
            </button>
          </div>

          {/* Product Grid */}

          <div className="grid md:grid-cols-3 gap-6">
            {products?.map((item) => (
              <div key={item._id} className="bg-white rounded-xl shadow-md p-4">
                <button className="float-right text-red-500 text-xl">♡</button>

                <img
                  src={item.imageUrl}
                  alt=""
                  className="h-40 mx-auto object-contain"
                />

                <h3 className="font-semibold mt-3">{item.productName}</h3>

                <p className="text-sm text-gray-500">
                  {item.categoryId?.categoryName}
                </p>

                <p className="text-sm text-gray-500">
                  {item.subCategoryId?.subCategoryName}
                </p>

                <p className="text-yellow-600 font-bold">
                  ₹{item.variants?.[0]?.price}
                </p>

                <button
                  onClick={() => navigate(`/productdetails/${item._id}`)}
                  className="mt-3 bg-[#003B5C] text-white w-full py-2 rounded-lg"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>

          {/* Pagination */}

          <div className="flex justify-center gap-2 mt-8">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setPage(index + 1)}
                className={`px-3 py-1 rounded ${
                  page === index + 1
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              Next
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;

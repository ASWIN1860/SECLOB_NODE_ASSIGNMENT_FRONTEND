import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { toast } from "react-toastify";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import {
  getAllProductsApi,
  getAllCategoriesApi,
  getAllSubCategoriesApi,
  addCategoryApi,
  addSubCategoryApi,
  addProductApi,
  addWishlistApi,
  getWishlistApi,
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

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  const [showSubCategoryModal, setShowSubCategoryModal] = useState(false);
  const [subCategoryName, setSubCategoryName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const [wishlist, setWishlist] = useState([]);

  const [showProductModal, setShowProductModal] = useState(false);
  const [productData, setProductData] = useState({
    productName: "",
    description: "",
    imageUrl: "",
    categoryId: "",
    subCategoryId: "",
    variants: [{ ram: "", price: "", qty: "" }],
  });

  //add category
  const handleAddCategory = async () => {
    try {
      const res = await addCategoryApi({ categoryName });
      if (res.status === 200) {
        toast.success("Category added successfully");
        setShowCategoryModal(false);
        setCategoryName("");
        getCategories();
      }
    } catch (err) {
      console.log(err);
    }
  };

  //add sub category
  const handleAddSubCategory = async () => {
    try {
      const res = await addSubCategoryApi({
        categoryId: selectedCategoryId,
        subCategoryName,
      });
      if (res.status === 200) {
        toast.success("Sub-Category added successfully");
        setShowSubCategoryModal(false);
        setSubCategoryName("");
        setSelectedCategoryId("");
        getSubCategories();
      }
    } catch (err) {
      console.log(err);
    }
  };

  //add product
  const handleAddProduct = async () => {
    try {
      const res = await addProductApi(productData);
      if (res.status === 200) {
        toast.success("Product added successfully");
        setShowProductModal(false);
        setProductData({
          productName: "",
          description: "",
          imageUrl: "",
          categoryId: "",
          subCategoryId: "",
          variants: [{ ram: "", price: "", qty: "" }],
        });
        getProducts();
      }
    } catch (err) {
      console.log(err);
    }
  };

  //add varient
  const addVariant = () => {
    setProductData({
      ...productData,
      variants: [...productData.variants, { ram: "", price: "", qty: "" }],
    });
  };

  //update varient
  const updateVariant = (index, field, value) => {
    const newVariants = [...productData.variants];
    newVariants[index][field] = value;
    setProductData({ ...productData, variants: newVariants });
  };

  //get product
  const getProducts = async () => {
    try {
      const result = await getAllProductsApi(
        searchKey,
        selectedSubCategory,
        page,
      );

      if (result && result.status === 200) {
        setProducts(result.data.products || []);
        setTotalPages(result.data.totalPages || 1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //get category
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

  //get sub categories
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

  //add to wishlist
  const handleWishlist = async (productId) => {
    try {
      const reqBody = {
        userId: sessionStorage.getItem("userId"),
        productId,
      };

      const result = await addWishlistApi(reqBody);

      if (result.status === 200) {
        setWishlist([...wishlist, productId]);
        toast.success("Added to Wishlist");
      }
    } catch (err) {
      console.log(err);
      if (err.response?.status === 400) {
        toast.info("Already in wishlist");
      } else {
        toast.error("Failed to add wishlist");
      }
    }
  };

  //get wishlist
  const getUserWishlist = async () => {
    try {
      const userId = sessionStorage.getItem("userId");
      const result = await getWishlistApi(userId);
      if (result.status === 200) {
        // Extract product IDs into the state array
        setWishlist(result.data.map((item) => item.productId?._id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(searchKey);
    getCategories();
    getSubCategories();
    getUserWishlist();
  }, []);

  useEffect(() => {
    getProducts();
  }, [searchKey, selectedSubCategory, page]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header searchKey={searchKey} setSearchKey={setSearchKey} />

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 h-[91vh] bg-white shadow-lg p-5">
          <h2 className="font-bold text-2xl text-center mb-4 pt-3">Categories</h2>

          <button
            onClick={() => {
              setSelectedSubCategory("");
              setPage(1);
            }}
            className="block mb-4 text-blue-600 font-bold cursor-pointer"
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
                    className="flex items-center gap-2 ml-4 mt-2 cursor-pointer"
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
            <h2 className="text-3xl font-bold">Products</h2>

            <div className="flex gap-2">
              <button
                onClick={() => setShowCategoryModal(true)}
                className="bg-yellow-500 text-white px-5 py-2 rounded-lg cursor-pointer font-semibold"
              >
                Add Category
              </button>
              <button
                onClick={() => setShowSubCategoryModal(true)}
                className="bg-yellow-500 text-white px-5 py-2 rounded-lg cursor-pointer font-semibold"
              >
                Add SubCategory
              </button>
              <button
                onClick={() => setShowProductModal(true)}
                className="bg-yellow-500 text-white px-5 py-2 rounded-lg cursor-pointer font-semibold"
              >
                Add Product
              </button>
            </div>
          </div>

          {/* Product Grid */}

          <div className="grid md:grid-cols-3 gap-6">
            {products?.map((item) => (
              <div key={item._id} className="bg-white rounded-xl shadow-md p-4">
                <button
                  onClick={() => handleWishlist(item._id)}
                  className={`float-right text-red-500 text-xl cursor-pointer`}
                >
                  {wishlist.includes(item._id) ? (
                    <FaHeart className="text-red-500 text-2xl" />
                  ) : (
                    <CiHeart className="text-2xl" />
                  )}
                </button>

                <img
                  src={item.imageUrl}
                  alt=""
                  className="h-40 mx-auto object-contain"
                />

                <h3 className="font-semibold mt-3">{item.productName}</h3>

                <p className="text-sm text-gray-500 font-semibold">
                  <span className="font-semibold text-blue-600">Category: </span>{item.categoryId?.categoryName}
                </p>

                <p className="text-sm text-gray-500 font-semibold">
                  <span className="font-semibold text-blue-600">Subcategory: </span>{item.subCategoryId?.subCategoryName}
                </p>

                <p className="text-yellow-600 font-bold">
                  ₹{item.variants?.[0]?.price}
                </p>

                <button
                  onClick={() => navigate(`/productdetails/${item._id}`)}
                  className="mt-3 bg-[#003B5C] text-white w-full py-2 rounded-lg cursor-pointer font-semibold"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>

          {/* Pagination */}

          <div className="flex justify-between items-center mt-10 px-2">
            {/* Left Side */}

            <p className="text-sm text-black">
              Showing <span className="font-bold">{products.length}</span> products
            </p>

            {/* Center Pagination */}

            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-2 py-1 text-gray-500 hover:text-black disabled:opacity-40"
              >
                ❮
              </button>

              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setPage(index + 1)}
                  className={`w-9 h-9 rounded-full text-sm font-medium transition-all duration-200 ${
                    page === index + 1
                      ? "bg-yellow-500 text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="px-2 py-1 text-gray-500 hover:text-black disabled:opacity-40"
              >
                ❯
              </button>
            </div>

            {/* Right Side */}

            <div>
              <div className="border border-gray-300 rounded-md px-3 py-1 text-sm">
                <h1>{totalPages}</h1>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modals */}
      {showCategoryModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-2xl border border-gray-200 w-96 text-center relative pointer-events-auto">
            <button
              onClick={() => setShowCategoryModal(false)}
              className="absolute top-2 right-4 text-gray-500 hover:text-red-500 font-bold text-xl"
            >
              &times;
            </button>
            <h3 className="text-lg font-bold mb-4">Add Category</h3>
            <input
              type="text"
              placeholder="Enter category name"
              className="border p-2 w-full rounded mb-4"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={handleAddCategory}
                className="bg-yellow-500 text-white px-6 py-2 rounded-lg font-semibold"
              >
                ADD
              </button>
              <button
                onClick={() => setShowCategoryModal(false)}
                className="border px-6 py-2 rounded-lg font-semibold"
              >
                DISCARD
              </button>
            </div>
          </div>
        </div>
      )}

      {showSubCategoryModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-2xl border border-gray-200 w-96 text-center relative pointer-events-auto">
            <button
              onClick={() => setShowSubCategoryModal(false)}
              className="absolute top-2 right-4 text-gray-500 hover:text-red-500 font-bold text-xl"
            >
              &times;
            </button>
            <h3 className="text-lg font-bold mb-4">Add Sub-Category</h3>
            <select
              className="border p-2 w-full rounded mb-4"
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.categoryName}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Enter sub-category name"
              className="border p-2 w-full rounded mb-4"
              value={subCategoryName}
              onChange={(e) => setSubCategoryName(e.target.value)}
            />
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={handleAddSubCategory}
                className="bg-yellow-500 text-white px-6 py-2 rounded-lg font-semibold"
              >
                ADD
              </button>
              <button
                onClick={() => setShowSubCategoryModal(false)}
                className="border px-6 py-2 rounded-lg font-semibold"
              >
                DISCARD
              </button>
            </div>
          </div>
        </div>
      )}

      {showProductModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-lg shadow-2xl border border-gray-200 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative pointer-events-auto">
            <button
              onClick={() => setShowProductModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 font-bold text-2xl"
            >
              &times;
            </button>
            <h3 className="text-lg font-bold mb-6 text-center">Add Product</h3>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <label className="w-32 font-medium text-left">Title :</label>
                <input
                  type="text"
                  className="border p-2 flex-1 rounded"
                  value={productData.productName}
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      productName: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex gap-4">
                <label className="w-32 font-medium text-left">Variants :</label>
                <div className="flex-1 flex flex-col gap-2">
                  {productData.variants.map((v, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <span className="text-sm">Ram :</span>
                      <input
                        type="text"
                        className="border p-1 w-16 rounded"
                        value={v.ram}
                        onChange={(e) =>
                          updateVariant(i, "ram", e.target.value)
                        }
                      />
                      <span className="text-sm">Price :</span>
                      <input
                        type="number"
                        className="border p-1 w-24 rounded"
                        value={v.price}
                        onChange={(e) =>
                          updateVariant(i, "price", e.target.value)
                        }
                      />
                      <span className="text-sm">Qty :</span>
                      <input
                        type="number"
                        className="border p-1 w-16 rounded"
                        value={v.qty}
                        onChange={(e) =>
                          updateVariant(i, "qty", e.target.value)
                        }
                      />
                    </div>
                  ))}
                  <div className="flex justify-end">
                    <button
                      onClick={addVariant}
                      className="bg-gray-800 text-white px-4 py-1 rounded text-sm mt-1"
                    >
                      Add variants
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <label className="w-32 font-medium text-left">Category :</label>
                <select
                  className="border p-2 flex-1 rounded"
                  value={productData.categoryId}
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      categoryId: e.target.value,
                    })
                  }
                >
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.categoryName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-4">
                <label className="w-32 font-medium text-left">
                  Sub-category :
                </label>
                <select
                  className="border p-2 flex-1 rounded"
                  value={productData.subCategoryId}
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      subCategoryId: e.target.value,
                    })
                  }
                >
                  <option value="">Select Sub-Category</option>
                  {subCategories
                    .filter(
                      (s) =>
                        s.categoryId?._id === productData.categoryId ||
                        s.categoryId === productData.categoryId,
                    )
                    .map((s) => (
                      <option key={s._id} value={s._id}>
                        {s.subCategoryName}
                      </option>
                    ))}
                </select>
              </div>

              <div className="flex gap-4">
                <label className="w-32 font-medium text-left">
                  Description :
                </label>
                <textarea
                  className="border p-2 flex-1 rounded"
                  rows="3"
                  value={productData.description}
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      description: e.target.value,
                    })
                  }
                ></textarea>
              </div>

              <div className="flex items-center gap-4">
                <label className="w-32 font-medium text-left">
                  Image URL :
                </label>
                <input
                  type="text"
                  className="border p-2 flex-1 rounded"
                  placeholder="Paste image url here..."
                  value={productData.imageUrl}
                  onChange={(e) =>
                    setProductData({ ...productData, imageUrl: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={handleAddProduct}
                className="bg-yellow-500 text-white px-8 py-2 rounded-lg font-semibold"
              >
                ADD
              </button>
              <button
                onClick={() => setShowProductModal(false)}
                className="border px-8 py-2 rounded-lg font-semibold"
              >
                DISCARD
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;

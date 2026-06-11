import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getSingleProductApi,
  getAllCategoriesApi,
  getAllSubCategoriesApi,
  updateProductApi,
} from "../services/allApis";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [productData, setProductData] = useState({
    productName: "",
    description: "",
    imageUrl: "",
    categoryId: "",
    subCategoryId: "",
    variants: [{ ram: "", price: "", qty: "" }],
  });

  const getSingleProduct = async () => {
    try {
      const result = await getSingleProductApi(id);

      if (result.status === 200) {
        const data = result.data;

        setProductData({
          productName: data.productName,
          description: data.description,
          imageUrl: data.imageUrl,
          categoryId: data.categoryId?._id,
          subCategoryId: data.subCategoryId?._id,
          variants: data.variants || [{ ram: "", price: "", qty: "" }],
        });
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

  const addVariant = () => {
    setProductData({
      ...productData,
      variants: [...productData.variants, { ram: "", price: "", qty: "" }],
    });
  };

  const updateVariant = (index, field, value) => {
    const updatedVariants = [...productData.variants];
    updatedVariants[index][field] = value;
    setProductData({
      ...productData,
      variants: updatedVariants,
    });
  };

  const handleUpdateProduct = async () => {
    try {
      const result = await updateProductApi(id, productData);

      if (result.status === 200) {
        toast.success("Product Updated Successfully");
        navigate(`/productdetails/${id}`);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to update product");
    }
  };

  useEffect(() => {
    getSingleProduct();
    getCategories();
    getSubCategories();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 md:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">Edit Product</h2>

          <div className="flex flex-col gap-5">
            {/* Product Name */}
            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
              <label className="w-full md:w-32 font-medium text-gray-700">Product Name :</label>
              <input
                type="text"
                className="border p-2 flex-1 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={productData.productName}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    productName: e.target.value,
                  })
                }
              />
            </div>

            {/* Variants */}
            <div className="flex flex-col md:flex-row gap-1 md:gap-4">
              <label className="w-full md:w-32 font-medium text-gray-700 md:mt-2">Variants :</label>

              <div className="flex-1 flex flex-col gap-3">
                {productData.variants.map((v, i) => (
                  <div key={i} className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-gray-50 p-2 rounded md:p-0 md:bg-transparent">
                    <input
                      type="text"
                      placeholder="RAM"
                      className="border p-2 rounded w-full bg-white"
                      value={v.ram}
                      onChange={(e) => updateVariant(i, "ram", e.target.value)}
                    />

                    <input
                      type="number"
                      placeholder="Price"
                      className="border p-2 rounded w-full bg-white"
                      value={v.price}
                      onChange={(e) => updateVariant(i, "price", e.target.value)}
                    />

                    <input
                      type="number"
                      placeholder="Qty"
                      className="border p-2 rounded w-full bg-white"
                      value={v.qty}
                      onChange={(e) => updateVariant(i, "qty", e.target.value)}
                    />
                  </div>
                ))}

                <button
                  onClick={addVariant}
                  className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm w-full sm:w-fit transition-colors"
                >
                  + Add Variant
                </button>
              </div>
            </div>

            {/* Category */}
            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
              <label className="w-full md:w-32 font-medium text-gray-700">Category :</label>
              <select
                className="border p-2 flex-1 rounded bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
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

            {/* Sub Category */}
            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
              <label className="w-full md:w-32 font-medium text-gray-700">Sub Category :</label>
              <select
                className="border p-2 flex-1 rounded bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={productData.subCategoryId}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    subCategoryId: e.target.value,
                  })
                }
              >
                <option value="">Select Sub Category</option>
                {subCategories
                  .filter(
                    (s) =>
                      s.categoryId?._id === productData.categoryId ||
                      s.categoryId === productData.categoryId
                  )
                  .map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.subCategoryName}
                    </option>
                  ))}
              </select>
            </div>

            {/* Description */}
            <div className="flex flex-col md:flex-row gap-1 md:gap-4">
              <label className="w-full md:w-32 font-medium text-gray-700 md:mt-2">Description :</label>
              <textarea
                rows="4"
                className="border p-2 flex-1 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={productData.description}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    description: e.target.value,
                  })
                }
              />
            </div>

            {/* Image URL */}
            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
              <label className="w-full md:w-32 font-medium text-gray-700">Image URL :</label>
              <input
                type="text"
                className="border p-2 flex-1 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={productData.imageUrl}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    imageUrl: e.target.value,
                  })
                }
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-8">
            <button
              onClick={() => navigate(-1)}
              className="border border-gray-300 hover:bg-gray-50 px-6 py-2.5 rounded-lg text-center font-medium transition-colors w-full sm:w-auto"
            >
              Cancel
            </button>

            <button
              onClick={handleUpdateProduct}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2.5 rounded-lg text-center font-medium transition-colors w-full sm:w-auto"
            >
              Update Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
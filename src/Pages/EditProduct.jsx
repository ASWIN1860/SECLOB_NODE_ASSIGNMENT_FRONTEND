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
          variants: data.variants,
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

      <div className="max-w-4xl mx-auto p-3">
        <div className="bg-white rounded-xl shadow-md p-5">
          <h2 className="text-3xl font-bold mb-5">Edit Product</h2>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <label className="w-32 font-medium">Product Name :</label>

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
              <label className="w-32 font-medium">Variants :</label>

              <div className="flex-1 flex flex-col gap-3">
                {productData.variants.map((v, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <input
                      type="text"
                      placeholder="RAM"
                      className="border p-2 rounded"
                      value={v.ram}
                      onChange={(e) => updateVariant(i, "ram", e.target.value)}
                    />

                    <input
                      type="number"
                      placeholder="Price"
                      className="border p-2 rounded"
                      value={v.price}
                      onChange={(e) =>
                        updateVariant(i, "price", e.target.value)
                      }
                    />

                    <input
                      type="number"
                      placeholder="Qty"
                      className="border p-2 rounded"
                      value={v.qty}
                      onChange={(e) => updateVariant(i, "qty", e.target.value)}
                    />
                  </div>
                ))}

                <button
                  onClick={addVariant}
                  className="bg-gray-800 text-white px-4 py-2 rounded w-fit"
                >
                  Add Variant
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="w-32 font-medium">Category :</label>

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
              <label className="w-32 font-medium">Sub Category :</label>

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
                <option value="">Select Sub Category</option>

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
              <label className="w-32 font-medium">Description :</label>

              <textarea
                rows="4"
                className="border p-2 flex-1 rounded"
                value={productData.description}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    description: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="w-32 font-medium">Image URL :</label>

              <input
                type="text"
                className="border p-2 flex-1 rounded"
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

          <div className="flex justify-end gap-4 mt-5">
            <button
              onClick={() => navigate(-1)}
              className="border px-6 py-2 rounded-lg"
            >
              Cancel
            </button>

            <button
              onClick={handleUpdateProduct}
              className="bg-yellow-500 text-white px-6 py-2 rounded-lg"
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

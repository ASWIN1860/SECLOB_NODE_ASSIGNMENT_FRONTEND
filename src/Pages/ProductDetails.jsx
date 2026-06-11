import React, { useEffect, useState } from "react";
import { FaStar, FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { getSingleProductApi, addWishlistApi, getWishlistApi } from "../services/allApis";
import { toast } from "react-toastify";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({});
  const [mainImage, setMainImage] = useState("");
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [qty, setQty] = useState(1);
 
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlist = async () => {
    try {
      const reqBody = {
        userId: sessionStorage.getItem('userId'),
        productId: id
      };
      const result = await addWishlistApi(reqBody);
      if (result.status === 200) {
        setIsWishlisted(true);
        toast.success("Added to Wishlist");
      }
    } catch (err) {
      console.log(err);
      toast.info("Already in wishlist");
    }
  };

  // Check if this product is already in wishlist
  const checkWishlist = async () => {
    try {
      const userId = sessionStorage.getItem('userId');
      const result = await getWishlistApi(userId);
      if (result.status === 200) {
        const ids = result.data.map((item) => item.productId?._id);
        setIsWishlisted(ids.includes(id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  //get single product
  const getSingleProduct = async () => {
    try {
      const result = await getSingleProductApi(id);

      if (result.status === 200) {
        setProduct(result.data);
        setMainImage(result.data.imageUrl);
        setSelectedVariant(0);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSingleProduct();
    checkWishlist();
  }, [id]);

  const images = [product?.imageUrl, product?.imageUrl];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="max-w-7xl mx-auto px-8 py-2">
        <div className="bg-white rounded-xl shadow-md p-5">
          <div className="grid md:grid-cols-2 gap-12">
            {/* LEFT SIDE */}

            <div>
              <div className="border rounded-xl p-3 h-[450px] flex items-center justify-center">
                <img
                  src={mainImage}
                  alt=""
                  className="max-h-[350px] object-contain"
                />
              </div>

              {/* Thumbnail Images */}

              <div className="flex justify-around gap-4 mt-3">
                {images.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => setMainImage(img)}
                    className={`cursor-pointer border rounded-lg p-2 ${
                      mainImage === img
                        ? "border-yellow-500"
                        : "border-gray-300"
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-24 h-24 object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE */}

            <div className="flex flex-col justify-center">
              <h2 className="text-4xl font-bold text-gray-800">
                {product?.productName}
              </h2>

              <div className="flex items-center gap-1 mt-4">
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />

                <span className="ml-2 text-gray-600">5.0 Rating</span>
              </div>

              <h3 className="text-2xl font-bold text-[#003B5C] mt-3">
                ₹{product?.variants?.[selectedVariant]?.price}
              </h3>

              {/* Stock */}

              <div className="mt-4">
                <p className="text-green-600 font-semibold">In Stock</p>

                <p className="text-gray-500 text-sm">
                  Hurry up! only {product?.variants?.[selectedVariant]?.qty}{" "}
                  products left
                </p>
              </div>

              {/* Description */}

              <p className="text-gray-700 leading-8 mt-3">
                {product?.description}
              </p>

              {/* RAM Variants */}

              <div className="mt-3">
                <p className="font-semibold mb-3">RAM :</p>

                <div className="flex gap-3">
                  {product?.variants?.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedVariant(index)}
                      className={`px-5 py-2 border rounded-lg transition ${
                        selectedVariant === index
                          ? "bg-yellow-500 text-white"
                          : "bg-white"
                      }`}
                    >
                      {item.ram}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}

              <div className="mt-3">
                <p className="font-semibold mb-3">Quantity</p>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => qty > 1 && setQty(qty - 1)}
                    className="border px-4 py-1 rounded"
                  >
                    -
                  </button>

                  <span className="font-semibold">{qty}</span>

                  <button
                    onClick={() => setQty(qty + 1)}
                    className="border px-4 py-1 rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Product Info */}

              <div className="mt-3 space-y-2">
                <p>
                  <span className="font-semibold">Category :</span>{" "}
                  {product?.categoryId?.categoryName}
                </p>

                <p>
                  <span className="font-semibold">Sub Category :</span>{" "}
                  {product?.subCategoryId?.subCategoryName}
                </p>

                <p>
                  <span className="font-semibold">Selected RAM :</span>{" "}
                  {product?.variants?.[selectedVariant]?.ram}
                </p>
              </div>

              {/* Buttons */}

              <div className="mt-8 flex flex-wrap gap-4">
                <button className="bg-yellow-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-600">
                  Edit Product
                </button>

                <button className="bg-[#003B5C] text-white px-8 py-3 rounded-lg font-semibold">
                  Buy It Now
                </button>

                <button onClick={handleWishlist} className="border rounded-lg px-4 flex items-center justify-center hover:bg-gray-100 cursor-pointer">
                  {isWishlisted ? <FaHeart size={24} className="text-red-500" /> : <CiHeart size={28} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;

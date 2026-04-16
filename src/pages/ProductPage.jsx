import { useContext, useEffect } from "react";
import { useState } from "react";
import { getSingleProduct } from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { CartContexts } from "../context/CartContext";
import { ToastContexts } from "../context/ToastContext";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import ProductSkeleton from "../components/ProductSkeleton";

export default function ProductPage() {
  const user = useAuth();
  const { cart, setCart } = useContext(CartContexts);

  // const [product, setProduct] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState("");

  const navigate = useNavigate();
  const { AddedNotify, AlreadyAddedNotify } = useContext(ToastContexts);

  const handleBuyNow = () => {
    addToCart();
    navigate("/checkout");
  };

  const addToCart = () => {
    if (!product) return;
    const alreadyProductInCart = cart.find((item) => {
      return item.id === product.id;
    });

    if (alreadyProductInCart) {
      AlreadyAddedNotify("Already Added in Your Cart");
      return;
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
      AddedNotify("Product is Added in Your Cart");
    }
  };

  const { id } = useParams();

  // useEffect(() => {
  //   const fetchSingleProduct = async () => {
  //     try {
  //       const data = await getSingleProduct(id);
  //       setProduct(data);
  //     } catch (error) {
  //       setError(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchSingleProduct();
  // }, [id]);

  const {
    data: product,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getSingleProduct(id),
  });

  if (loading)
    return (
      <ProductSkeleton/>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-[60vh] px-4 text-center">
        <h2 className="text-lg md:text-2xl text-red-600">
          Error: {error.message}
        </h2>
      </div>
    );

  return (
    <div className="min-h-screen bg-white">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-start">
          {/* IMAGE */}
          <div className="w-full bg-green-50 rounded-xl p-4 sm:p-6 md:p-10 flex justify-center items-center">
            <img
              src={product?.images?.[0]}
              alt="product"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md object-contain"
            />
          </div>

          {/* DETAILS */}
          <div className="w-full flex flex-col bg-gray-100 p-4 sm:p-6 md:p-10 rounded-xl">
            {/* Title */}
            <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-gray-800 leading-tight">
              {product.title}
            </h1>

            {/* SKU */}
            <p className="text-gray-500 mt-2 text-xs sm:text-sm">
              SKU : {product.sku}
            </p>

            {/* Category */}
            <p className="text-gray-500 mt-1 text-xs sm:text-sm">
              Category : {product.category}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-3">
              <span className="text-yellow-500 text-sm sm:text-lg">★★★★☆</span>
              <span className="text-gray-600 text-xs sm:text-sm">
                {product.rating.toFixed(1)}
              </span>
            </div>

            {/* Price */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-600 mt-4 md:mt-6">
              ${product.price}
            </h2>

            {/* Description */}
            <p className="text-gray-600 mt-4 md:mt-6 text-sm sm:text-base leading-relaxed">
              {product.description}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6 md:mt-8">
              <button
                onClick={() => {
                  user ? addToCart() : navigate("/login");
                }}
                className="w-full flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold transition duration-300 active:scale-95"
              >
                Add to Cart
              </button>

              <button
                onClick={() => {
                  user ? handleBuyNow() : navigate("/login");
                }}
                className="w-full flex-1 border border-gray-300 hover:border-gray-400 py-3 rounded-xl font-semibold transition duration-300"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

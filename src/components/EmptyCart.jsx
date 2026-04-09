import React from "react";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

export const EmptyCart = () => {
  return (
    <div className="min-h-[92vh] flex items-center justify-center  px-4">
      <div className="w-full max-w-sm text-center">

        {/* Icon */}
        <div className="flex justify-center mb-5">
          <div className="p-5 rounded-full bg-green-100">
            <ShoppingCart size={36} className="text-green-600" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-xl font-semibold text-gray-800 mb-2">
          Cart is Empty
        </h1>

        {/* Subtitle */}
        <p className="text-gray-500 text-sm mb-6">
          No items added yet. Start shopping to fill your cart.
        </p>

        {/* Button */}
        <Link
          to="/"
          className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition"
        >
          Browse Products
        </Link>

      </div>
    </div>
  );
};
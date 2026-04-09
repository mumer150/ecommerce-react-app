import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SuccessPage() {
  const [order, setOrder] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saveOrder = localStorage.getItem("orders")
      ? JSON.parse(localStorage.getItem("orders"))
      : [];

    if (!saveOrder) {
      navigate("/");
      return;
    }

    const latestorder = saveOrder[saveOrder.length - 1];

    if (!latestorder) {
      navigate("/");
      return;
    }

    setOrder(latestorder);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-3 sm:px-4 py-6">
      
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-4 sm:p-6 text-center">
        
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="bg-green-100 text-green-600 rounded-full 
                          w-16 h-16 sm:w-20 sm:h-20 
                          flex items-center justify-center 
                          text-2xl sm:text-4xl">
            ✓
          </div>
        </div>

        {/* Title */}
        <h1 className="text-xl sm:text-2xl font-bold mt-4 sm:mt-6 text-gray-800">
          Order Placed Successfully!
        </h1>

        {/* Message */}
        <p className="text-gray-500 mt-2 sm:mt-3 text-xs sm:text-sm px-2">
          Thank you for your order. Your order has been placed successfully. 
          We will contact you soon for delivery.
        </p>

        {/* Order Info */}
        <div className="bg-gray-100 rounded-lg p-3 sm:p-4 mt-4 sm:mt-6 text-xs sm:text-sm text-gray-700 text-left">
          <p>
            <span className="font-semibold">Order ID:</span> #{order?.id}
          </p>
          <p className="mt-1">
            <span className="font-semibold">Total Products:</span>{" "}
            {order?.totalProducts}
          </p>
          <p className="mt-1">
            <span className="font-semibold">Payment:</span> ${Math.floor(order?.total)}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2 sm:gap-3 mt-4 sm:mt-6">
          
          <button
            onClick={() => navigate("/")}
            className="w-full bg-green-500 hover:bg-green-600 text-white 
                       py-2.5 sm:py-3 
                       text-sm sm:text-base 
                       rounded-xl font-semibold transition active:scale-95"
          >
            Continue Shopping
          </button>

          <button
            onClick={() => navigate("/orders")}
            className="w-full border border-gray-300 hover:border-gray-400 
                       py-2.5 sm:py-3 
                       text-sm sm:text-base 
                       rounded-xl font-semibold transition"
          >
            View Order
          </button>

        </div>
      </div>
    </div>
  );
}
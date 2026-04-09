import { useEffect, useState } from "react";
import { SingleProductOnOrderPage } from "../components/SingleProductOnOrderPage";
import { Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const [order, setOrder] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saveOrder = localStorage.getItem("orders")
      ? JSON.parse(localStorage.getItem("orders"))
      : [];
    const latestorder = saveOrder[saveOrder.length - 1];
    setOrder(latestorder);
  }, []);

  if (!order) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-3 sm:px-4">
        <div className="text-center max-w-md">
          
          {/* Icon */}
          <div className="flex justify-center mb-3 sm:mb-4">
            <div className="bg-gray-100 p-3 sm:p-4 rounded-full">
              <Package className="w-6 h-6 sm:w-8 sm:h-8 text-gray-500" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            No Orders Yet
          </h2>

          {/* Description */}
          <p className="text-gray-500 mt-2 text-xs sm:text-sm px-2">
            It looks like you haven’t placed any orders yet. Start shopping now.
          </p>

          {/* CTA */}
          <button
            onClick={() => navigate("/")}
            className="mt-4 sm:mt-5 px-4 py-2 text-sm sm:text-base bg-black text-white rounded-lg hover:bg-gray-800 transition active:scale-95"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 md:py-8 px-3 sm:px-4">
      
      <div className="max-w-5xl mx-auto">
        
        {/* Title */}
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 md:mb-6">
          My Orders
        </h1>

        {/* Order Card */}
        <div className="bg-white rounded-2xl shadow p-4 sm:p-5 mb-4 md:mb-6">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b pb-3 md:pb-4 mb-3 md:mb-4 gap-2">
            
            <p className="font-semibold text-gray-800 text-sm sm:text-base">
              Order ID: #{order?.id}
            </p>

            <span className="bg-yellow-100 text-yellow-600 text-xs sm:text-sm font-semibold px-3 py-1 rounded-full w-fit">
              Pending
            </span>
          </div>

          {/* Products */}
          <div className="space-y-3 md:space-y-4">
            {order?.products?.map((item) => (
              <SingleProductOnOrderPage key={item.id} item={item} />
            ))}
          </div>

          {/* Footer */}
          <div className="border-t mt-3 md:mt-4 pt-3 md:pt-4 flex justify-between items-center">
            
            <span className="text-xs sm:text-sm text-gray-500">
              {order?.products?.length} items
            </span>

            <span className="text-base sm:text-lg font-bold">
              ${Math.floor(order?.total)}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
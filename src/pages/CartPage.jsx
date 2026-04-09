import { useContext } from "react";
import { CartProduct } from "../components/CartProduct";
import { CartContexts } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { EmptyCart } from "../components/EmptyCart";
import { PaymentBox } from "../components/PaymentBox";
import { ArrowLeft } from "lucide-react";
import { ToastContexts } from "../context/ToastContext";

export default function CartPage() {
  const { cart, allQuantity } = useContext(CartContexts);
  const { AlreadyAddedNotify } = useContext(ToastContexts);
  const navigate = useNavigate();

  return (
    <>
      {allQuantity > 0 && (
        <div className="min-h-screen bg-gray-100 py-4 md:py-8 px-3 md:px-0">
          
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            
            {/* LEFT SIDE - CART ITEMS */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-3 md:p-4">
              
              {/* Header */}
              <div className="flex items-center gap-3 border-b pb-3 mb-4">
                <button
                  onClick={() => navigate("/")}
                  className="w-8 h-8 flex items-center justify-center border-2 border-green-500 rounded-full hover:bg-green-500 transition"
                >
                  <ArrowLeft className="hover:text-white" size={18} />
                </button>

                <h2 className="text-base md:text-xl font-semibold">
                  Items From Your Cart
                </h2>
              </div>

              {/* Cart Items (Scrollable only on desktop) */}
              <div className="space-y-3 md:max-h-[500px] md:overflow-y-auto">
                {cart.map((product) => (
                  <CartProduct key={product.id} product={product} />
                ))}
              </div>
            </div>

            {/* RIGHT SIDE - ORDER SUMMARY */}
            <div className="bg-white rounded-xl shadow-sm p-3 md:p-4 h-auto lg:h-[400px]">
              
              {/* Top */}
              <div className="flex justify-between items-center border-b pb-3 mb-4">
                <h2 className="font-semibold text-sm md:text-lg">
                  {allQuantity} Items Added
                </h2>

                <div className="flex gap-1">
                  <span className="w-2 h-5 md:h-6 bg-green-500"></span>
                  <span className="w-2 h-5 md:h-6 bg-green-500"></span>
                  <span className="w-2 h-5 md:h-6 bg-green-500"></span>
                </div>
              </div>

              {/* Order Box */}
              <div className="bg-gray-100 rounded-xl p-3 md:p-4">
                
                <h2 className="text-lg md:text-xl font-bold mb-4 text-center">
                  Your Order
                </h2>

                <PaymentBox />

                {/* CHECKOUT BUTTON */}
                <button
                  onClick={() => navigate("/checkout")}
                  className="mt-4 md:mt-5 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition duration-300 active:scale-95"
                >
                  Checkout
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {allQuantity < 1 && <EmptyCart />}
    </>
  );
}
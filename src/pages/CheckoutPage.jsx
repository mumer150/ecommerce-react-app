import React, { useContext, useState } from "react";
import { CartProduct } from "../components/CartProduct";
import { CartContexts } from "../context/CartContext";
import { PaymentBox } from "../components/PaymentBox";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContexts } from "../context/ToastContext";

export default function CheckoutPage() {
  const { cart, setCart } = useContext(CartContexts);
  const { AddedNotify, AlreadyAddedNotify } = useContext(ToastContexts);

  const [isLoading, setIsLoading] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (allFormData) => {
    setIsLoading(true);
    try {
      const products = cart.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      }));

      const orderData = {
        userId: 1,
        products: products,
        customerName: allFormData.fullName,
        shippingAddress: allFormData.address,
        phone: allFormData.phone,
        paymentMethod: allFormData.payment,
        email: allFormData.email,
        city: allFormData.city,
      };

      const res = await axios.post(
        "https://dummyjson.com/carts/add",
        orderData
      );

      setPlacedOrder(true);
      reset();
      navigate("/success");

      const finalOrder = localStorage.getItem("orders")
        ? JSON.parse(localStorage.getItem("orders"))
        : [];

      finalOrder.push(res.data);
      localStorage.setItem("orders", JSON.stringify(finalOrder));

      setCart([]);
    } catch (error) {
      AlreadyAddedNotify(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {cart.length > 0 && (
        <div className="min-h-screen bg-gray-50 py-6 md:py-10 px-3 md:px-4">
          
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
            
            {/* LEFT - FORM */}
            <div className="bg-white rounded-2xl shadow p-4 sm:p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
                Contact & Delivery
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                
                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      Full Name *
                    </label>
                    <input
                      {...register("fullName", {
                        required: "Please Enter Your Name",
                      })}
                      className="w-full border rounded-lg px-3 md:px-4 py-2 md:py-3 text-sm focus:ring-2 focus:ring-black"
                      placeholder="Full name"
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      Phone *
                    </label>
                    <input
                      {...register("phone", {
                        required: "Phone is Required",
                        pattern: {
                          value: /^03[0-9]{9}$/,
                          message: "Phone must be 03001234567",
                        },
                      })}
                      className="w-full border rounded-lg px-3 md:px-4 py-2 md:py-3 text-sm focus:ring-2 focus:ring-black"
                      placeholder="03000000000"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                </div>

                {/* City & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      City *
                    </label>
                    <select
                      {...register("city", { required: "Select City" })}
                      className="w-full border rounded-lg px-3 md:px-4 py-2 md:py-3 text-sm focus:ring-2 focus:ring-black"
                    >
                      <option value="">Select City</option>
                      <option value="Karachi">Karachi</option>
                      <option value="Lahore">Lahore</option>
                      <option value="Islamabad">Islamabad</option>
                    </select>
                    {errors.city && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.city.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      Email *
                    </label>
                    <input
                      {...register("email", {
                        required: "Email required",
                        pattern: {
                          value: /^\S+@\S+\.\S+$/,
                          message: "Invalid email",
                        },
                      })}
                      className="w-full border rounded-lg px-3 md:px-4 py-2 md:py-3 text-sm focus:ring-2 focus:ring-black"
                      placeholder="email@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                </div>

                {/* Address */}
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Address *
                  </label>
                  <input
                    {...register("address", {
                      required: "Enter address",
                    })}
                    className="w-full border rounded-lg px-3 md:px-4 py-2 md:py-3 text-sm focus:ring-2 focus:ring-black"
                    placeholder="Street, House no"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.address.message}
                    </p>
                  )}
                </div>

                {/* Payment */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Payment Method
                  </label>

                  <div className="space-y-2">
                    {["COD", "Card", "Jazzcash", "EasyPaisa"].map((method) => (
                      <label
                        key={method}
                        className="flex items-center gap-3 border rounded-lg p-2 md:p-3 text-sm cursor-pointer"
                      >
                        <input
                          {...register("payment", {
                            required: "Select payment method",
                          })}
                          value={method}
                          type="radio"
                        />
                        {method}
                      </label>
                    ))}
                  </div>

                  {errors.payment && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.payment.message}
                    </p>
                  )}
                </div>

                {/* Terms */}
                <label className="text-sm flex items-start gap-2">
                  <input
                    type="checkbox"
                    {...register("agree", {
                      required: "Accept terms",
                    })}
                  />
                  I agree to terms
                </label>

                {errors.agree && (
                  <p className="text-red-500 text-xs">
                    {errors.agree.message}
                  </p>
                )}

                {/* Button */}
                <button
                  disabled={!isValid || isLoading}
                  className="w-full bg-black text-white py-3 rounded-lg font-semibold mt-3 disabled:bg-gray-400"
                >
                  {isLoading ? "Placing..." : "Place Order"}
                </button>
              </form>
            </div>

            {/* RIGHT - CART */}
            <div className="bg-white rounded-2xl shadow p-4 sm:p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
                Your Cart
              </h2>

              <div className="space-y-3 max-h-[300px] md:max-h-[360px] overflow-y-auto pr-1">
                {cart.map((product) => (
                  <CartProduct key={product.id} product={product} />
                ))}
              </div>

              <div className="border-t mt-4 md:mt-6 pt-4">
                <PaymentBox />
              </div>
            </div>

          </div>
        </div>
      )}

      {cart.length == 0 && !placedOrder && <Navigate to={"/"} replace />}
    </>
  );
}
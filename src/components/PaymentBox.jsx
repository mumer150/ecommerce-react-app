import { useContext } from "react";
import { CartContexts } from "../context/CartContext";

export const PaymentBox = () => {
const {cart} =useContext(CartContexts)


  const subTotal = cart.reduce((total, item) => {
    return Math.floor(total + item.price * item.quantity);
  }, 0);

  const posFee = 1;

  const gst = Math.floor((15 / 100) * subTotal);

  const total = subTotal + posFee;
  return (
    <>
      <div className="flex justify-between mb-2">
        <span>Sub Total :</span>
        <span>${subTotal}</span>
      </div>

      <div className="flex justify-between mb-2">
        <span>POS Fee :</span>
        <span>${posFee}</span>
      </div>

      <div className="flex justify-between mb-3">
        <span>GST (15%) :</span>
        <span>${gst}</span>
      </div>

      <hr className="my-2" />

      <div className="flex justify-between font-semibold text-lg">
        <span>Total :</span>
        <span>$ {total}</span>
      </div>
    </>
  );
};

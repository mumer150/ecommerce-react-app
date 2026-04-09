import { useContext } from "react";
import { CartContexts } from "../context/CartContext";
import { ToastContexts } from "../context/ToastContext";
import { PaintBucketIcon, Trash2 } from "lucide-react";

export const CartProduct = ({ product }) => {
  const { cart, setCart } = useContext(CartContexts);

  const { AddedNotify, AlreadyAddedNotify } = useContext(ToastContexts);

  const incraeseQuantity = (id) => {
    const updateCart = cart.map((item) => {
      return item.id == id ? { ...item, quantity: item.quantity + 1 } : item;
    });
    setCart(updateCart);
    AddedNotify("Add Quantity");
  };

  const decreaseQuantity = (id) => {
    const updateCart = cart.map((item) => {
      return item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item;
    });
    setCart(updateCart);
    if (product.quantity == 1) {
      AlreadyAddedNotify("this is minimum quantity of product");
    } else {
      AddedNotify("Decrease Quantity");
    }
  };

  const removeProduct = (id) => {
    const updateCart = cart.filter((item) => {
      return item.id !== id;
    });
    setCart(updateCart);
  };

  return (
    <>
      {/* ITEM 1 */}
      <div className="flex justify-between items-center bg-gray-100 rounded-xl p-4 mb-4">
        {/* LEFT */}
        <div className="flex gap-4 items-center">
          <div className="w-20 h-20 bg-gray-200 rounded-lg">
            <img src={product.thumbnail} alt="" />
          </div>

          <div>
            <h3 className="font-bold text-lg">{product.title}</h3>
            <p className="text-sm text-gray-500">${product.price}</p>

            <div className="flex items-center gap-3 mt-3">
              <button
                onClick={() => {
                  decreaseQuantity(product.id);
                }}
                className="border border-green-500 text-green-500 px-3 py-1 rounded"
              >
                -
              </button>

              <span className="font-semibold">{product.quantity}</span>

              <button
                onClick={() => {
                  incraeseQuantity(product.id);
                }}
                className="border border-green-500 text-green-500 px-3 py-1 rounded"
              >
                +
              </button>
              <Trash2
                color="red"
                onClick={() => {
                  removeProduct(product.id);
                }}
              />
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <h3 className="font-bold text-lg">
          ${(product.price * product.quantity).toFixed(2)}
        </h3>
      </div>
    </>
  );
};

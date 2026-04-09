import { createContext, useEffect, useState } from "react";

export const CartContexts = createContext();

export const CartContext = ({ children }) => {
  const [cart, setCart] = useState(() => {
    return localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  

  const allQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <CartContexts.Provider value={{ cart, setCart, allQuantity }}>
        {children}
      </CartContexts.Provider>
    </>
  );
};

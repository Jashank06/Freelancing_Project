import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (service) => {
    setCart((prev) => [...prev, service]);
  };

  const removeFromCart = (name) => {
    setCart((prev) => prev.filter((s) => s.name !== name));
  };

  const clearCart = () => setCart([]);

  const totalPrice = cart.reduce((sum, s) => {
    return sum + parseInt(s.price.replace("₹", ""));
  }, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

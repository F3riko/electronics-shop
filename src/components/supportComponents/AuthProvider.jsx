import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState({ items: {}, itemsQuantity: 0 });

  const handleCart = (itemId, action) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      const item = updatedCart.items[itemId];

      if (item) {
        if (action === "incr") {
          item.quantity++;
          updatedCart.itemsQuantity++;
        } else if (action === "decr") {
          if (item.quantity === 1) {
            delete updatedCart.items[itemId];
            updatedCart.itemsQuantity--;
          } else {
            item.quantity--;
            updatedCart.itemsQuantity--;
          }
        }
      } else if (action === "incr") {
        updatedCart.items[itemId] = { id: itemId, quantity: 1 };
        updatedCart.itemsQuantity++;
      }

      return updatedCart;
    });
  };

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, cart, handleCart }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

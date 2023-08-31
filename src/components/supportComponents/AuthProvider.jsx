import React, { createContext, useContext, useState, useEffect } from "react";
import { getCategoriesList } from "../../services/homepage-api";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState({ items: {}, itemsQuantity: 0 });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const categories = await getCategoriesList();
      setCategories(categories);
    })();
    // Getting user name here
    const openDataCookie = Cookies.get("openData");
    console.log(openDataCookie);
    if (openDataCookie !== undefined) {
      const email = JSON.parse(openDataCookie);
      const userData = { email };
      login(userData);
    }
  }, []);

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
    <AuthContext.Provider
      value={{ user, login, logout, cart, handleCart, categories }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

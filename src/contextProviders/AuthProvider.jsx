import React, { createContext, useContext, useState, useEffect } from "react";
import { getCategoriesList } from "../services/homepage-api";
import Cookies from "js-cookie";
import { getCart } from "../services/api/cartApi/getCartApi";
import { addItem } from "../services/api/cartApi/addItemApi";
import { delItem } from "../services/api/cartApi/deleteItemApi";
import { getWishList } from "../services/authService/userAuth/authorization/userWishList";
import { getOrderHistory } from "../services/authService/userAuth/authorization/getOrderHistory";
import { updateWishList } from "../services/authService/userAuth/authorization/updateWishList";
import { clearCart } from "../services/api/cartApi/clearCartApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const defaultCart = {
    items: {},
    itemsQuantity: 0,
    itemsSelectedQuantity: 0,
  };
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(defaultCart);
  const [categories, setCategories] = useState([]);
  const [fetchStatus, setfetchStatus] = useState({
    cartError: false,
    categoriesError: false,
    cartCounterError: false,
  });
  const [wishList, setWishList] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);

  const updateCartFromServer = async (updatedCart) => {
    try {
      let updatedCartData;
      if (!updatedCart) {
        updatedCartData = await getCart();
      } else {
        updatedCartData = updatedCart;
      }
      setCart((prevCart) => {
        const updatedCart = { ...prevCart };
        const allIDsItemsServer = [];
        // Modifying quantity or adding item if doesn't exist
        for (const item of updatedCartData) {
          allIDsItemsServer.push(item.item_id);
          const oldItem = updatedCart.items[item.item_id];
          if (oldItem) {
            updatedCart.itemsQuantity -= oldItem.quantity;
            if (oldItem.selected) {
              updatedCart.itemsSelectedQuantity -= oldItem.quantity;
            }
            oldItem.quantity = item.item_quantity;
            if (oldItem.selected) {
              updatedCart.itemsSelectedQuantity += item.item_quantity;
            }
            updatedCart.itemsQuantity += item.item_quantity;
          } else {
            const itemId = item.item_id;
            updatedCart.items[itemId] = {
              id: itemId,
              quantity: item.item_quantity,
              selected: true,
            };
            updatedCart.itemsQuantity += item.item_quantity;
            updatedCart.itemsSelectedQuantity += item.item_quantity;
          }
        }
        // Deleting non present in the server's list
        for (const item of Object.keys(updatedCart.items)) {
          const quantity = updatedCart.items[item].quantity;
          if (!allIDsItemsServer.includes(parseInt(item))) {
            updatedCart.itemsQuantity -= quantity;
            if (updatedCart.items[item].selected) {
              updatedCart.itemsSelectedQuantity -= quantity;
            }
            delete updatedCart.items[item];
          }
        }
        return updatedCart;
      });
    } catch (error) {
      throw error;
    }
  };

  const updateWishListFromServer = async (userId) => {
    const wishListResult = await getWishList(userId);
    setWishList(wishListResult);
  };

  const updateOrderHistoryFromServer = async (userId) => {
    const orderHistory = await getOrderHistory(userId);
    setOrderHistory(orderHistory);
  };

  const handleLikeDislike = async (userId, productId, actionType) => {
    await updateWishList(userId, productId, actionType);
    updateWishListFromServer(userId);
  };

  useEffect(() => {
    try {
      if (fetchStatus.cartError)
        setfetchStatus((prevValue) => ({ ...prevValue, cartError: false }));
      updateCartFromServer();
    } catch (error) {
      setfetchStatus((prevValue) => ({ ...prevValue, cartError: true }));
    }
    if (user) {
      (async () => {
        try {
          await updateWishListFromServer(user.id);
          await updateOrderHistoryFromServer(user.id);
        } catch (error) {}
      })();
    }
    if (!user) {
      setWishList([]);
      setOrderHistory([]);
    }
  }, [user]);

  useEffect(() => {
    try {
      (async () => {
        const categories = await getCategoriesList();
        setCategories(categories);
      })();
    } catch (error) {
      setfetchStatus((prevValue) => ({ ...prevValue, categoriesError: true }));
    }
    login();
  }, []);

  const handleCart = async (itemId, action) => {
    try {
      if (fetchStatus.cartCounterError)
        setfetchStatus((prevValue) => ({
          ...prevValue,
          cartCounterError: false,
        }));
      if (action === "incr") {
        const newCartData = await addItem(itemId);
        await updateCartFromServer(newCartData);
      } else if (action === "decr") {
        const newCartData = await delItem(itemId);
        await updateCartFromServer(newCartData);
      }
    } catch (error) {
      setfetchStatus((prevValue) => ({ ...prevValue, cartCounterError: true }));
    }
  };
  
  const handleClearCart = async () => {
    await clearCart()
    await updateCartFromServer()
  }

  const handleSelectCart = (itemId) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      const item = updatedCart.items[itemId];

      if (item) {
        if (item.selected) {
          item.selected = false;
          updatedCart.itemsSelectedQuantity -= item.quantity;
        } else {
          item.selected = true;
          updatedCart.itemsSelectedQuantity += item.quantity;
        }
      }

      return updatedCart;
    });
  };

  const handleSelectAll = () => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      const items = Object.values(updatedCart.items);

      const newSelectedState =
        updatedCart.itemsSelectedQuantity !== updatedCart.itemsQuantity;

      items.forEach((item) => {
        item.selected = newSelectedState;
      });

      if (newSelectedState) {
        updatedCart.itemsSelectedQuantity = updatedCart.itemsQuantity;
      } else {
        updatedCart.itemsSelectedQuantity = 0;
      }

      return updatedCart;
    });
  };

  const login = () => {
    const openDataCookie = Cookies.get("openData");
    if (openDataCookie !== undefined) {
      const openDataObj = JSON.parse(openDataCookie);
      setUser(openDataObj);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        cart,
        handleSelectCart,
        handleCart,
        categories,
        handleSelectAll,
        updateCartFromServer,
        fetchStatus,
        wishList,
        handleLikeDislike,
        orderHistory,
        updateOrderHistoryFromServer,
        handleClearCart
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

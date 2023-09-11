import axios from "axios";

export const updateWishList = async (userId, productId, actionType) => {
  axios.defaults.withCredentials = true;
  try {
    const response = await axios.post(
      "http://localhost:3100/auth/wishlist/",
      {
        itemInWishList: actionType === "add" ? false : true,
        productId,
        userId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
};

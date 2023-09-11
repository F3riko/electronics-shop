import axios from "axios";

export const getWishList = async (userId) => {
  try {
    axios.defaults.withCredentials = true;
    const response = await axios.get(
      `http://localhost:3100/auth/wishlist?userId=${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

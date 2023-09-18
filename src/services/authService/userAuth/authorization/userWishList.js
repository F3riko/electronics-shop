import axios from "axios";

export const getWishList = async (userId) => {
  try {
    axios.defaults.withCredentials = true;
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_SERVER_URL}/auth/wishlist?userId=${userId}`,
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

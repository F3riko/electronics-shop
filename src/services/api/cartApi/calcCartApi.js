import axios from "axios";

export const getCalcCart = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3100/cart/getCartDetails`,
      {
        withCredentials: true,
      }
    );
    return response.data.info;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

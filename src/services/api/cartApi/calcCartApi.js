import axios from "axios";

export const getCalcCart = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3100/cart/details`,
      {
        withCredentials: true,
      }
    );
    return response.data.info;
  } catch (error) {
    throw error;
  }
};

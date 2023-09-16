import axios from "axios";

export const clearCart = async () => {
  try {
    const response = await axios.delete(`http://localhost:3100/cart/clear`, {
      withCredentials: true,
    });
    return response.status;
  } catch (error) {
    throw error;
  }
};

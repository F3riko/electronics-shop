import axios from "axios";

export const clearCart = async () => {
  try {
    const response = await axios.delete(`${process.env.REACT_APP_BASE_SERVER_URL}/cart/clear`, {
      withCredentials: true,
    });
    return response.status;
  } catch (error) {
    throw error;
  }
};

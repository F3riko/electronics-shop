import axios from "axios";

export const orderAuth = async (orderId) => {
  try {
    axios.defaults.withCredentials = true;
    const response = await axios.get(
      `http://localhost:3100/auth/order?orderId=${orderId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.status;
  } catch (error) {
    throw error;
  }
};

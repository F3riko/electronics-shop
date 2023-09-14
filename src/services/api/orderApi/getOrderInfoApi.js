import axios from "axios";

export const getOrderInfoById = async (orderId) => {
  try {
    axios.defaults.withCredentials = true;
    const response = await axios.get(
      `http://localhost:3100/order/info?id=${orderId}`,
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

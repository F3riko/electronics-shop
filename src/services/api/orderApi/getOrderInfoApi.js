import axios from "axios";

export const getOrderInfoById = async (orderId) => {
  try {
    const orderIdJson = JSON.stringify(orderId);
    axios.defaults.withCredentials = true;
    const response = await axios.post(
      "http://localhost:3100/order/orderinfo",
      { id: orderIdJson },
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

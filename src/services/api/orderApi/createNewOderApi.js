import axios from "axios";

export const createOrder = async (cartDataObj) => {
  try {
    axios.defaults.withCredentials = true;
    const response = await axios.post(
      "http://localhost:3100/order/",
      cartDataObj,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.orderId;
  } catch (error) {
    throw error;
  }
};

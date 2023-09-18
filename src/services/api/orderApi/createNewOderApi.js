import axios from "axios";

export const createOrder = async (cartDataObj) => {
  try {
    axios.defaults.withCredentials = true;
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_SERVER_URL}/order/`,
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

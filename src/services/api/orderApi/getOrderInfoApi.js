import axios from "axios";

export const getOrderInfoById = async (orderId) => {
  try {
    axios.defaults.withCredentials = true;
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_SERVER_URL}/order/info?id=${orderId}`,
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

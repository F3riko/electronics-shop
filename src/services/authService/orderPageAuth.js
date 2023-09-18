import axios from "axios";

export const orderAuth = async (orderId) => {
  try {
    axios.defaults.withCredentials = true;
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_SERVER_URL}/auth/order?orderId=${orderId}`,
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

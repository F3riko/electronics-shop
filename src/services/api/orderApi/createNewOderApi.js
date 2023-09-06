import axios from "axios";

export const createOrder = async (cartDataObj) => {
  try {
    axios.defaults.withCredentials = true;
    const response = await axios.post(
      "http://localhost:3100/api/newOrder",
      cartDataObj,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return response.data.orderId;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
};

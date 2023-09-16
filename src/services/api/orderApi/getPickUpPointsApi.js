import axios from "axios";

export const getPickUpPointsApi = async () => {
  try {
    const response = await axios.get("http://localhost:3100/order/addresses", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

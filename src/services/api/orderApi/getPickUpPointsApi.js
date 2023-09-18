import axios from "axios";

export const getPickUpPointsApi = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BASE_SERVER_URL}/order/addresses`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

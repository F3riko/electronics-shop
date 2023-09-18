import axios from "axios";

export const reviewAuth = async (userId, productId) => {
  try {
    axios.defaults.withCredentials = true;
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_SERVER_URL}/auth/review?userId=${userId}&productId=${productId}`,
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

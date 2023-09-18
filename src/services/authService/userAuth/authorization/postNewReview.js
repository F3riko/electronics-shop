import axios from "axios";

export const postNewReview = async (reviewData, productId, userName, userId) => {
  axios.defaults.withCredentials = true;
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_SERVER_URL}/auth/review/`,
      {
        userId,
        productId,
        reviewData,
        userName
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
};

import axios from "axios";

export const getProductsReviews = async (id) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_SERVER_URL}/products/reviews?id=${id}`,
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

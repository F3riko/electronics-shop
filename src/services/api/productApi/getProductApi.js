import axios from "axios";

export const getProduct = async (id) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_SERVER_URL}/products/product?id=${id}`,
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

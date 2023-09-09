import axios from "axios";

export const getProduct = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:3100/products/product?id=${id}`,
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

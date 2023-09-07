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
    if (response.status === 200) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
};

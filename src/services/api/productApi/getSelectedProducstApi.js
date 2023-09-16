import axios from "axios";

export const getSelectedProducts = async (productsIds) => {
  try {
    const productIdsJSON = JSON.stringify(productsIds);
    const response = await axios.post(
      "http://localhost:3100/products/selected",
      { productsIds: productIdsJSON },
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

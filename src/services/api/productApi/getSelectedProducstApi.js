import axios from "axios";

export const getSelectedProducts = async (productsIds) => {
  try {
    const productIdsJSON = JSON.stringify(productsIds);
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_SERVER_URL}/products/selected`,
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

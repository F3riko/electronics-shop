import axios from "axios";

export const getProducts = async (query) => {
  try {
    const response = await axios.get(`http://localhost:3100/products${query}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCategoriesList = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3100/products/categories"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPriceRange = async (categoryId) => {
  try {
    const response = await axios.get(
      `http://localhost:3100/products/price-range?category=${categoryId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

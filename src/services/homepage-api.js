import axios from "axios";

export const getProducts = async (query) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BASE_SERVER_URL}/products${query}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCategoriesList = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_SERVER_URL}/products/categories`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPriceRange = async (categoryId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_SERVER_URL}/products/price-range?category=${categoryId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSpecsByCategory = async (categoryId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_SERVER_URL}/products/specs?category=${categoryId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
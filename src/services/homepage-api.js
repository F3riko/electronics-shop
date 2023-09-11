import axios from "axios";
// const serverUrl = "localhost:3100/";

export const getProducts = async () => {
  try {
    const response = await axios.get("http://localhost:3100/products");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductsByCategory = async (categoryId) => {
  try {
    const response = await axios.get(
      `http://localhost:3100/products/category?category=${categoryId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductsSorted = async (sortQuery) => {
  try {
    const response = await axios.get(
      `http://localhost:3100/products/sorted${sortQuery}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductsByQuery = async (searchQuery) => {
  try {
    const response = await axios.get(
      `http://localhost:3100/products/search?searchQuery=${searchQuery}`
    );
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

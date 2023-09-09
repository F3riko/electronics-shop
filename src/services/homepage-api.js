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

// export const getProductsFiltered = (filteredBy, order) => {
//   order = order === "desc" ? "desc" : "asc";
//     const products = await fetch (`http://localhost:3100/api/products/?`)
// };

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

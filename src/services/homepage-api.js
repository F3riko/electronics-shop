import axios from "axios";
// const serverUrl = "localhost:3100/";

export const getProducts = async () => {
  //   const products = await fetch(serverUrl + "/api/products");
  const products = await fetch("http://localhost:3100/products");
  const productsData = await products.json();
  return productsData;
};

export const getProductsByCategory = async (categoryId) => {
  try {
    const response = await axios.get(
      `http://localhost:3100/products/category?category=${categoryId}`
    );

    if (response.status !== 200) {
      throw new Error("Failed to fetch products");
    }

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
    const categories = await fetch("http://localhost:3100/products/categories");
    if (!categories.ok) {
      throw new Error(`HTTP error! Status: ${categories.status}`);
    }
    const categoriesData = await categories.json();
    return categoriesData;
  } catch (error) {
    console.error("An error occurred:", error);
    // You can choose to return a default value or re-throw the error here.
    throw error;
  }
};

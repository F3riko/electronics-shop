// const serverUrl = "localhost:3100/";

export const getProducts = async () => {
  //   const products = await fetch(serverUrl + "/api/products");
  const products = await fetch("http://localhost:3100/api/products");
  const productsData = await products.json();
  return productsData;
};

export const getProductsByCategory = async (categoryId) => {
  const products = await fetch(
    `http://localhost:3100/api/products/category?category=${categoryId}`
  );
  const productsData = await products.json();
  return productsData;
};

// export const getProductsFiltered = (filteredBy, order) => {
//   order = order === "desc" ? "desc" : "asc";
//     const products = await fetch (`http://localhost:3100/api/products/?`)
// };

export const getCategoriesList = async () => {
  const categories = await fetch(
    "http://localhost:3100/api/products/categories"
  );
  const categoriesData = await categories.json();
  return categoriesData;
};

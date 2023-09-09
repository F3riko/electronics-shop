import ProductPreviewGallery from "./productPreviewGallery/ProductPreviewGallery";
import CategoriesBar from "./CategoriesBar";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { createContext, useEffect, useState } from "react";
import {
  getCategoriesList,
  getProducts,
  getProductsByCategory,
} from "../../../services/homepage-api";
import NoDataError from "../../shared/NoDataError";

// Context for homepage components
export const HomeContext = createContext();

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [fetchStatus, setFetchStatus] = useState({
    productsError: false,
    categoriesError: false,
    productsLoading: false,
  });

  useEffect(() => {
    (async () => {
      try {
        if (activeCategory) {
          let products;
          setFetchStatus((prevData) => ({
            ...prevData,
            productsLoading: true,
          }));
          if (activeCategory.id === 0) {
            products = await getProducts();
          } else {
            products = await getProductsByCategory(activeCategory.id);
          }
          if (!products) throw new Error("No products data");
          setProducts(products);
        }
      } catch (error) {
        setFetchStatus((prevData) => ({ ...prevData, productsError: true }));
      } finally {
        setFetchStatus((prevData) => ({ ...prevData, productsLoading: false }));
      }
    })();
  }, [activeCategory]);

  useEffect(() => {
    (async () => {
      try {
        const categories = await getCategoriesList();
        setCategories(categories);
        setActiveCategory(categories[0]);
      } catch (error) {
        setFetchStatus((prevData) => ({ ...prevData, categoriesError: true }));
      }
    })();
  }, []);

  // Logic to filter products based on the category
  // Note: do I have to change url here or it's not necessary for SPA?

  return (
    <HomeContext.Provider value={categories}>
      {!fetchStatus.productsError && !fetchStatus.categoriesError ? (
        <Row>
          <Col md={2}>
            <CategoriesBar
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          </Col>
          <Col md={9}>
            <ProductPreviewGallery
              productsData={products}
              loading={fetchStatus.productsLoading}
            />
          </Col>
        </Row>
      ) : (
        <NoDataError />
      )}
    </HomeContext.Provider>
  );
};

export default Homepage;

import ProductPreviewGallery from "./Product Preview Gallery/ProductPreviewGallery";
import CategoriesBar from "./CategoriesBar";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { createContext, useEffect, useState } from "react";
import {
  getCategoriesList,
  getProducts,
  getProductsByCategory,
} from "../../../dal/rest-api/homepage-api";

// Context for homepage components
export const HomeContext = createContext();

const Homepage = () => {
  // Initial data fetching
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState({});

  useEffect(() => {
    (async () => {
      if (activeCategory && activeCategory !== 0) {
        const products = await getProductsByCategory(activeCategory.id);
        setProducts(products);
      }
    })();
  }, [activeCategory]);

  useEffect(() => {
    (async () => {
      const products = await getProducts();
      const categories = await getCategoriesList();
      setProducts(products);
      setCategories(categories);
      setActiveCategory(categories[0]);
    })();
  }, []);

  // Logic to filter products based on the category
  // Note: do I have to change url here or it's not necessary for SPA?
  // Basic fetch for all of the products can also be done with category func
  // Make fetch for children categories of the active one
  // Order of fetching and unnecessary calls

  return (
    <HomeContext.Provider value={categories}>
      <Row>
        <Col md={2}>
          <CategoriesBar
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        </Col>
        <Col md={9}>
          <ProductPreviewGallery productsData={products} />
        </Col>
      </Row>
    </HomeContext.Provider>
  );
};

export default Homepage;

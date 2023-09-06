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

// Context for homepage components
export const HomeContext = createContext();

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    (async () => {
      if (activeCategory) {
        let products;
        if (activeCategory.id === 0) {
          products = await getProducts();
        } else {
          products = await getProductsByCategory(activeCategory.id);
        }
        setProducts(products);
      }
    })();
  }, [activeCategory]);

  useEffect(() => {
    (async () => {
      const categories = await getCategoriesList();
      setCategories(categories);
      setActiveCategory(categories[0]);
    })();
  }, []);

  // Logic to filter products based on the category
  // Note: do I have to change url here or it's not necessary for SPA?

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

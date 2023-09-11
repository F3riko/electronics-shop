import ProductPreviewGallery from "./productPreviewGallery/ProductPreviewGallery";
import CategoriesBar from "./CategoriesBar";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { createContext, useEffect, useState } from "react";
import {
  getCategoriesList,
  getProducts,
  getProductsByCategory,
  getProductsByQuery,
} from "../../../services/homepage-api";
import NoDataError from "../../shared/NoDataError";
import SortingBar from "./SortingBar";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addQueryParams,
  getAllQueryParams,
  resetQueryParams,
} from "../../../utils/navigation/urlParsing";
import { getProductsSorted } from "../../../services/homepage-api";

// Context for homepage components
export const HomeContext = createContext();

const Homepage = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
        const categories = await getCategoriesList();
        setCategories(categories);
        setActiveCategory(categories[0]);
      } catch (error) {
        setFetchStatus((prevData) => ({ ...prevData, categoriesError: true }));
      }
    })();
  }, []);

  useEffect(() => {
    if (activeCategory?.id) {
      navigate(`?category=${activeCategory?.id}`);
    } else {
      resetQueryParams(navigate);
    }
  }, [activeCategory]);

  useEffect(() => {
    const allParams = getAllQueryParams(location);
    (async () => {
      try {
        let products;
        setFetchStatus((prevData) => ({
          ...prevData,
          productsLoading: true,
        }));
        if (Object.values(allParams).length === 0) {
          products = await getProducts();
        } else if (
          allParams?.category &&
          Object.values(allParams).length === 1
        ) {
          products = await getProductsByCategory(allParams.category);
        } else if (
          allParams?.searchQuery &&
          Object.values(allParams).length === 1
        ) {
          products = await getProductsByQuery(allParams.searchQuery);
        } else {
          const queryParamsString = location.search;
          products = await getProductsSorted(queryParamsString);
        }
        if (!products) throw new Error("No products data");
        setProducts(products);
      } catch (error) {
        setFetchStatus((prevData) => ({ ...prevData, productsError: true }));
      } finally {
        setFetchStatus((prevData) => ({ ...prevData, productsLoading: false }));
      }
    })();
  }, [location]);

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
            <Row>
              <SortingBar activeCategory={activeCategory} />
            </Row>
            <Row>
              <ProductPreviewGallery
                productsData={products}
                loading={fetchStatus.productsLoading}
              />
            </Row>
          </Col>
        </Row>
      ) : (
        <NoDataError />
      )}
    </HomeContext.Provider>
  );
};

export default Homepage;

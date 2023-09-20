import ProductPreviewGallery from "../../shared/productPreviewGallery/ProductPreviewGallery";
import CategoriesBar from "./CategoriesBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { createContext, useEffect, useState, useRef } from "react";
import { getCategoriesList, getProducts } from "../../../services/homepage-api";
import NoDataError from "../../shared/NoDataError";
import SortingBar from "./SortingBar";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addQueryParams,
  deleteQueryParam,
  getAllQueryParams,
} from "../../../utils/navigation/urlParsing";
import SpecsSortBar from "./SpecsSortBar/SpecsSortBar";

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
  const prevActiveCategory = useRef(activeCategory);

  useEffect(() => {
    (async () => {
      try {
        const categories = await getCategoriesList();
        setCategories(categories);
        const allQueryParams = getAllQueryParams(location);
        if (allQueryParams.category) {
          setActiveCategory(categories[allQueryParams.category]);
        } else {
          setActiveCategory(categories[0]);
        }
      } catch (error) {
        setFetchStatus((prevData) => ({ ...prevData, categoriesError: true }));
      }
    })();
  }, []);

  useEffect(() => {
    if (activeCategory?.id) {
      addQueryParams({ category: activeCategory.id }, location, navigate);
    } else {
      if (prevActiveCategory.current?.id) {
        deleteQueryParam("category", location, navigate);
      }
    }

    // Update the previous value to match the current one
    prevActiveCategory.current = activeCategory;
  }, [activeCategory]);

  useEffect(() => {
    (async () => {
      try {
        setFetchStatus((prevData) => ({
          ...prevData,
          productsLoading: true,
        }));
        const products = await getProducts(location.search);
        if (!products) throw new Error("No products data");
        setProducts(products);
      } catch (error) {
        setFetchStatus((prevData) => ({ ...prevData, productsError: true }));
      } finally {
        setFetchStatus((prevData) => ({ ...prevData, productsLoading: false }));
      }
    })();
  }, [location]);

  return (
    <HomeContext.Provider value={categories}>
      {!fetchStatus.productsError && !fetchStatus.categoriesError ? (
        <Container className="home-page-wrapper">
          <Row>
            <Col md={2}>
              <CategoriesBar
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
              />
              <SpecsSortBar activeCategory={activeCategory} />
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
        </Container>
      ) : (
        <NoDataError />
      )}
    </HomeContext.Provider>
  );
};

export default Homepage;

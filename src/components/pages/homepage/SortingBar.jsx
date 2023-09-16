import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { getPriceRange } from "../../../services/homepage-api";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addQueryParams,
  deleteQueryParam,
  deleteSortingParams,
  getAllQueryParams,
} from "../../../utils/navigation/urlParsing";

const SortingBar = ({ activeCategory }) => {
  const defaultSortOptions = {
    minPrice: "",
    maxPrice: "",
    sortBy: "",
  };
  const navigate = useNavigate();
  const location = useLocation();
  const [pricesLimit, setPricesLimit] = useState({ min: 0, max: 0 });
  const [sortOptions, setSortOptions] = useState(defaultSortOptions);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    try {
      (async () => {
        const prices = await getPriceRange(activeCategory?.id);
        setPricesLimit({
          min: parseInt(prices.minPrice || 0),
          max: parseInt(prices.maxPrice || 0),
        });
      })();
    } catch (error) {
      setPricesLimit({ min: 0, max: +Infinity });
    }
  }, [activeCategory]);

  useEffect(() => {
    const queryParams = getAllQueryParams(location);
    if (queryParams.searchQuery) {
      setSearchQuery(queryParams.searchQuery);
    }
  }, [location.search]);

  const handleSort = async () => {
    const queryParams = Object.keys(sortOptions)
      .filter((key) => sortOptions[key] !== "")
      .reduce((acc, key) => {
        acc[key] = sortOptions[key];
        return acc;
      }, {});
    if (Object.values(queryParams).length) {
      addQueryParams(queryParams, location, navigate);
    }
  };

  const handleReset = () => {
    for (const sortParam of Object.values(sortOptions)) {
      if (sortParam) {
        deleteSortingParams(sortOptions, location, navigate);
        setSortOptions(defaultSortOptions);
        break;
      }
    }
  };

  const handleResetSearch = () => {
    deleteQueryParam("searchQuery", location, navigate);
    setSearchQuery("");
  };

  return (
    <Container className="mt-3 mb-2 sort-bar-wrapper">
      <Row className="d-flex align-items-center ">
        <Col xs={12} md={4} className="sort-bar-sortOptions-range-wrapper mb-1">
          <Row>
            <Col className="px-0">
              <Form.Control
                onChange={(e) => {
                  setSortOptions((prevValue) => ({
                    ...prevValue,
                    minPrice: e.target.value,
                  }));
                }}
                min={pricesLimit.min}
                type="number"
                placeholder={`from ${pricesLimit.min}$`}
                value={sortOptions.minPrice}
              />
            </Col>
            <Col className="pe-0 ps-2">
              <Form.Control
                onChange={(e) => {
                  setSortOptions((prevValue) => ({
                    ...prevValue,
                    maxPrice: e.target.value,
                  }));
                }}
                min={pricesLimit.min}
                max={pricesLimit.max}
                type="number"
                placeholder={`to ${pricesLimit.max}$`}
                value={sortOptions.maxPrice}
              />
            </Col>
          </Row>
        </Col>
        <Col xs={12} md={4} className="sort-bar-sort-by mb-1">
          <Form.Control
            as="select"
            value={sortOptions.sortBy}
            onChange={(e) =>
              setSortOptions((prevValue) => ({
                ...prevValue,
                sortBy: e.target.value,
              }))
            }
          >
            <option value={null}>Sort by</option>
            <option value="priceAsc">Price: from low to high</option>
            <option value="priceDsc">Price: from high to low</option>
            <option value="quantity">Reviews quantity</option>
            <option value="rating">Rating</option>
          </Form.Control>
        </Col>
        <Col xs={12} md={4} className="sort-by-button mb-1">
          <Button className="apply-button-small-screen" onClick={handleSort}>
            Apply filters
          </Button>
          <Button
            onClick={handleReset}
            variant="danger"
            className="ms-3 sort-button"
          >
            Reset
          </Button>
        </Col>
      </Row>
      {searchQuery && (
        <Row>
          <Col className="sort-search-query-wrapper">
            <Alert variant="light" className="sort-search-query-alert">
              <span>
                Here are the results for your search query: "{searchQuery}"
              </span>
              <Button
                variant="danger"
                onClick={handleResetSearch}
                className="sort-button"
              >
                Clear
              </Button>
            </Alert>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default SortingBar;

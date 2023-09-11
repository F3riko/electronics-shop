import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import {
  getPriceRange,
} from "../../../services/homepage-api";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addQueryParams,
  resetQueryParams,
} from "../../../utils/navigation/urlParsing";

const SortingBar = ({ activeCategory }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [pricesLimit, setPricesLimit] = useState({ min: 0, max: 0 });
  const [sortOptions, setSortOptions] = useState({
    minPrice: null,
    maxPrice: null,
    sortBy: null,
  });

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

  const handleSort = async () => {
    if (activeCategory.id > 0) {
      setSortOptions((prevValue) => ({
        ...prevValue,
        category: activeCategory.id,
      }));
    }

    const queryParams = Object.keys(sortOptions)
      .filter((key) => sortOptions[key] !== null && sortOptions[key] !== false)
      .reduce((acc, key) => {
        acc[key] = sortOptions[key];
        return acc;
      }, {});

    addQueryParams(queryParams, location, navigate);
  };

  return (
    <Container className="mt-3 mb-2">
      <Row className="d-flex align-items-center">
        <Col className="sort-bar-sortOptions-range-wrapper">
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
                defaultValue={sortOptions.minPrice}
              />
            </Col>
            <Col xs={1}>-</Col>
            <Col className="px-0">
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
                defaultValue={sortOptions.maxPrice}
              />
            </Col>
          </Row>
        </Col>
        <Col className="sort-bar-sort-by">
          <Form.Control
            as="select"
            defaultValue={sortOptions.sortBy}
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
        <Col className="sort-by-button">
          <Button onClick={handleSort}>Apply filters</Button>
          <Button
            onClick={() => resetQueryParams(navigate)}
            variant="danger"
            className="ms-3"
          >
            Reset
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default SortingBar;

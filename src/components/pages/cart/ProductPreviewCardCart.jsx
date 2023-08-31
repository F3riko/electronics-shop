import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import CustomLink from "../../supportComponents/CustomLink";
import Form from "react-bootstrap/Form";
import { useAuth } from "../../supportComponents/AuthProvider";
import Counter from "../../supportComponents/Counter";
import { useState, useEffect } from "react";
import PriceBlock from "../../supportComponents/PriceBlock";
import { getCategoryNameById } from "../../../utils/categoryUtils";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../../utils/useFetch";
import { getProduct } from "../../../services/api/getProduct-api";
import { getProductImg } from "../../../services/api/getProductImg-api";

const ProductPreviewCardCart = ({ selected, handleSelect, itemId }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [liked, setLiked] = useState(false);
  const {
    data: productData,
    loading: productLoading,
    error: productError,
  } = useFetch(getProduct, itemId);

  const {
    data: imgData,
    loading: imgLoading,
    error: imgError,
  } = useFetch(getProductImg, itemId);

  const { cart, handleCart, categories } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLike = () => {
    setLiked((prevValue) => !prevValue);
  };

  const ProductTitle = () => {
    return (
      <Row className="mb-2 cart-product-title-text">
        <CustomLink to={`/product/${productData.id}`}>
          <Col>{productData.title}</Col>
        </CustomLink>
      </Row>
    );
  };

  return (
    <Container fluid className="cart-pr-tile-wrapper">
      {productLoading && <h5>Loading...</h5>}
      {productData && (
        <>
          <Row>
            <Col
              md={1}
              xs={1}
              className="d-flex flex-column align-items-center justify-content-center px-0"
            >
              <Form.Check type="checkbox" id={productData.id}>
                <Form.Check.Input
                  type="checkbox"
                  className="cart-custom-check-box"
                  checked={selected}
                  onChange={() => handleSelect(productData.id)}
                />
              </Form.Check>
            </Col>

            <Col xs={12} md={3} className="cart-product-tile-thubmnail-wrapper">
              <Link to={`/product/${productData.id}`}>
                <Image
                  src={imgLoading || !imgData ? "/placeholder1.png" : imgData}
                  className={
                    imgLoading || !imgData
                      ? "product-tile-thubmnail"
                      : "product-tile-thubmnail-image"
                  }
                />
              </Link>
            </Col>

            <Col className="mt-1 cart-middle-column">
              <ProductTitle />
              <span>
                <span className="cart-secondary-text">Category</span>:
                {productData?.category_id &&
                  getCategoryNameById(categories, productData.category_id)}
              </span>

              {/* No description here, only list of specs from db */}

              {/* <span>Description: {productData.description}</span> */}
              {/* <span>Year of production: {productData.year_of_production}</span> */}
              {/* <span>Weight: {productData.weight}g</span> */}
              {/* <span>In stock: {productData.stock_quantity}</span> */}
            </Col>

            {isSmallScreen && <ProductTitle />}

            <Col
              xs={12}
              md={4}
              className="d-flex flex-column justify-content-between"
            >
              <Row>
                <Col className="px-4 d-flex justify-content-between align-items-center">
                  <PriceBlock
                    price={productData.price * cart.items[itemId].quantity}
                    discount={
                      productData.discount * cart.items[itemId].quantity
                    }
                  />
                  {liked ? (
                    <FontAwesomeIcon
                      icon={faHeartSolid}
                      style={{ color: "#f8104b" }}
                      size="lg"
                      onClick={handleLike}
                      className="me-1"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faHeart}
                      onClick={handleLike}
                      size="lg"
                      className="me-1"
                    />
                  )}
                </Col>
              </Row>

              <Counter
                handleCounter={handleCart}
                cartState={cart.items[itemId].quantity}
                itemId={productData.id}
              />
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default ProductPreviewCardCart;

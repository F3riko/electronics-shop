import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faHeart as faHeartSolid,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import CustomLink from "../../../supportComponents/CustomLink";
import { useContext, useState, useEffect } from "react";
import { HomeContext } from "../Homepage";
import { getCategoryNameById } from "../../../../utils/categoryUtils";
import Counter from "../../../supportComponents/Counter";
import PriceBlock from "../../../supportComponents/PriceBlock";

const ProductPreviewCard = ({ productData }) => {
  const [liked, setLiked] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const categories = useContext(HomeContext);
  const categoryName = getCategoryNameById(categories, productData.category_id);
  const price = parseInt(productData.price);
  // Testing for discount
  // const discount =
  //   (productData.discount && parseInt(productData.discount)) || null;
  const discount = 25;

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

  const ProductTitle = () => {
    return (
      <Row className="mb-2 product-title-text">
        <CustomLink to={`product/${productData.id}`}>
          <Col>{productData.title}</Col>
        </CustomLink>
      </Row>
    );
  };

  const handleLike = () => {
    setLiked((prevValue) => !prevValue);
  };

  const handleCart = (action) => {
    if (action === "+") {
      setCartQuantity((prevValue) => prevValue + 1);
    } else {
      setCartQuantity((prevValue) => prevValue - 1);
    }
  };

  return (
    <Container fluid className="product-tile-wrapper">
      <Row>
        <Col xs={12} md={3} className="product-tile-thubmnail-wrapper">
          <Link to={`product/${productData.id}`}>
            <Image src="/placeholder1.png" className="product-tile-thubmnail" />
          </Link>
        </Col>

        <Col className="mt-1 middle-column">
          <ProductTitle />
          <Row>
            <span>
              <span className="cart-secondary-text">Category</span>:{" "}
              {categoryName}
            </span>
            {/* No description here, only list of specs from db */}

            {/* <span>Description: {productData.description}</span> */}
            {/* <span>Year of production: {productData.year_of_production}</span> */}
            {/* <span>Weight: {productData.weight}g</span> */}
            {/* <span>In stock: {productData.stock_quantity}</span> */}
          </Row>
          <Row>
            <Col>
              <span className="me-2">
                <FontAwesomeIcon icon={faStar} style={{ color: "fbce2d" }} />
                <span className="mx-1">9</span>
              </span>
              <span>
                <FontAwesomeIcon icon={faComment} />
                <span className="mx-1">9</span>
              </span>
            </Col>
          </Row>
        </Col>

        {isSmallScreen && <ProductTitle />}
        <Col
          xs={12}
          md={3}
          className="d-flex flex-column justify-content-between"
        >
          <Row>
            <Col className="d-flex justify-content-between align-items-center">
              <PriceBlock price={price} discount={discount} />
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
          {cartQuantity === 0 ? (
            <Button
              variant="primary"
              className="mb-2"
              onClick={() => {
                handleCart("+");
              }}
            >
              <FontAwesomeIcon icon={faCartShopping} />
              <span className="cart-text ms-1">Cart</span>
            </Button>
          ) : (
            <Counter handleCounter={handleCart} cartState={cartQuantity} />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductPreviewCard;

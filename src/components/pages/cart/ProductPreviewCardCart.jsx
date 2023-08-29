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
// import { getCategoryNameById } from "../../../utils/categoryUtils";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";

const ProductPreviewCardCart = ({ productData, selected, handleSelect }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [liked, setLiked] = useState(false);
  // const categories = useContext(HomeContext);
  // const categoryName = getCategoryNameById(categories, productData.category_id);
  const price = parseInt(productData.price);
  // Testing for discount
  // const discount =
  //   (productData.discount && parseInt(productData.discount)) || null;
  const discount = 25;

  const handleLike = () => {
    setLiked((prevValue) => !prevValue);
  };

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
      <Row className="mb-2 cart-product-title-text">
        <CustomLink to={`product/${productData.id}`}>
          <Col>{productData.title}</Col>
        </CustomLink>
      </Row>
    );
  };
  const { cart, handleCart } = useAuth();
  return (
    <Container fluid className="cart-pr-tile-wrapper">
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
          <Link to={`product/${productData.id}`}>
            <Image
              src="/placeholder1.png"
              className="cart-product-tile-thubmnail"
            />
          </Link>
        </Col>

        <Col className="mt-1 cart-middle-column">
          <ProductTitle />
          <span>
            <span className="cart-secondary-text">Category</span>:{" "}
            {/* {categoryName} */}
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

          <Counter
            handleCounter={handleCart}
            cartState={cart.items[productData.id].quantity}
            itemId={productData.id}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ProductPreviewCardCart;

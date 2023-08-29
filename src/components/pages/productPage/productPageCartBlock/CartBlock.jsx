import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Counter from "../../../supportComponents/Counter";
import PriceBlock from "../../../supportComponents/PriceBlock";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

const CartBlock = ({ price, discount }) => {
  const [cartQuantity, setCartQuantity] = useState(0);
  const [liked, setLiked] = useState(false);

  const handleCart = (action) => {
    if (action === "+") {
      setCartQuantity((prevValue) => prevValue + 1);
    } else {
      setCartQuantity((prevValue) => prevValue - 1);
    }
  };

  const handleLike = () => {
    setLiked((prevValue) => !prevValue);
  };

  return (
    <Container className="product-page-cart-block-container">
      <Row>
        <Col className="d-flex justify-content-between align-items-center mb-2">
          <PriceBlock discount={discount} price={price} />
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
      <Row>
        <Col>
          {cartQuantity === 0 ? (
            <Button
              variant="primary"
              className="mb-2 w-100"
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

export default CartBlock;

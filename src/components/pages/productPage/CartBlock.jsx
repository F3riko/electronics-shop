import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Counter from "../../shared/Counter";
import PriceBlock from "../../shared/PriceBlock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../../contextProviders/AuthProvider";
import LikeButton from "../../shared/LikeButton";

const CartBlock = ({ price, discount, itemId }) => {
  const { cart, handleCart } = useAuth();

  return (
    <Container className="product-page-cart-block-container">
      <Row>
        <Col className="d-flex justify-content-between align-items-center mb-2">
          <PriceBlock discount={discount} price={price} />
          <LikeButton productId={itemId} overlayPosition={"top"} />
        </Col>
      </Row>
      <Row>
        <Col>
          {cart.items[itemId] === undefined ? (
            <Button
              variant="primary"
              className="mb-2 w-100"
              onClick={() => {
                handleCart(itemId, "incr");
              }}
            >
              <FontAwesomeIcon icon={faCartShopping} />
              <span className="cart-text ms-1">Cart</span>
            </Button>
          ) : (
            <Counter
              handleCounter={handleCart}
              cartState={cart.items[itemId].quantity}
              itemId={itemId}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CartBlock;

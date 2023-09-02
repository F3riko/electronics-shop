import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useAuth } from "./AuthProvider";

const CheckoutPlate = ({ orderPageFlag, clickHandler }) => {
  
  const { cart } = useAuth();
  const buttonText = orderPageFlag ? "Create order" : "Check out";
  const additionalS = cart.itemsSelectedcart !== 1 ? "s" : "";
  
  return (
    <Container>
      <div className="cart-checkout-wrapper">
        <Row className="justify-content-center cart-checkout-button-wrapper">
          <Button className="cart-checkout-button" onClick={clickHandler}>
            <span className="cart-text">{buttonText}</span>
          </Button>
        </Row>

        <Row>
          <Col xs={6}>
            <p className="cart-checkout-info-p">Your cart</p>
            <p className="cart-checkout-info-p">
              Item{additionalS}: {cart.itemsSelectedQuantity}
            </p>
            <p className="cart-checkout-info-p">Total price</p>
          </Col>
          <Col xs={6}>
            <p className="cart-checkout-info-p">
              {cart.itemsSelectedQuantity} item{additionalS}
            </p>
            <p className="cart-checkout-info-p">0,26kg</p>
            <p className="cart-checkout-info-p">268$</p>
          </Col>
          {orderPageFlag && (
            <Col md={6}>
              <p className="cart-checkout-info-p">Delivery fee</p>
            </Col>
          )}
        </Row>
        {orderPageFlag && (
          <div>
            <div>
              <Row>
                <Col md={6}>
                  <p className="cart-checkout-info-p">Total</p>
                </Col>
              </Row>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default CheckoutPlate;

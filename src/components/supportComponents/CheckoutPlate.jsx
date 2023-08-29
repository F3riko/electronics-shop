import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

const CheckoutPlate = ({ itemsData, orderPageFlag }) => {
  return (
    <Container>
      <div className="cart-checkout-wrapper">
        <div className="cart-checkout-button-wrapper">
          <Row className="justify-content-center">
            <Button className="cart-checkout-button">
              {orderPageFlag ? "Create order" : "Check out"}
            </Button>
          </Row>
        </div>
        <Row>
          <Col md={6}>
            <p className="cart-checkout-info-p">Your cart</p>
            <p className="cart-checkout-info-p">Items()</p>
          </Col>
          <Col md={6}>
            <p className="cart-checkout-info-p">3 items 0,26kg</p>
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

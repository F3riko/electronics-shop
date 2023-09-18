import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Placeholder from "react-bootstrap/Placeholder";
import Alert from "react-bootstrap/Alert";

const CheckoutPlateOrder = ({
  orderData,
  itemsQuantity,
  clickHandler,
  paymentError,
  error,
  loading,
}) => {
  const additionalS = itemsQuantity !== 1 ? "s" : "";

  return (
    <Container>
      <div className="cart-checkout-wrapper">
        <Row className="justify-content-center cart-checkout-button-wrapper">
          <Button
            className="cart-checkout-button"
            onClick={clickHandler}
            variant={paymentError ? "danger" : "primary"}
            disabled={paymentError && true}
          >
            <span className="cart-text">
              {paymentError ? `Choose ${paymentError}` : "Pay"}
            </span>
          </Button>
        </Row>
        {error && (
          <Alert className="mt-3 mb-0" variant="danger">
            Oops! Something went wrong, try reloading the page!
          </Alert>
        )}
        {!error && (
          <Row>
            <Col xs={6}>
              {loading && (
                <>
                  <Placeholder animation="glow">
                    <Placeholder xs={12} bg="primary" />
                  </Placeholder>
                  <Placeholder animation="glow">
                    <Placeholder xs={12} bg="primary" />
                  </Placeholder>
                  <Placeholder animation="glow">
                    <Placeholder xs={12} bg="primary" />
                  </Placeholder>
                </>
              )}
              {orderData && (
                <>
                  <p className="cart-checkout-info-p">Your cart</p>
                  <p className="cart-checkout-info-p">
                    Item{additionalS}: {itemsQuantity}
                  </p>
                  <p className="cart-checkout-info-p">Total price</p>
                </>
              )}
            </Col>
            <Col xs={6}>
              {loading && (
                <>
                  <Placeholder animation="glow">
                    <Placeholder xs={12} bg="primary" />
                  </Placeholder>
                  <Placeholder animation="glow">
                    <Placeholder xs={12} bg="primary" />
                  </Placeholder>
                  <Placeholder animation="glow">
                    <Placeholder xs={12} bg="primary" />
                  </Placeholder>
                </>
              )}
              {orderData && (
                <>
                  <p className="cart-checkout-info-p">
                    {itemsQuantity} item{additionalS}
                  </p>
                  <p className="cart-checkout-info-p">
                    {orderData.order_weight / 1000} kg
                  </p>
                  <p className="cart-checkout-info-p">
                    {orderData.order_total}$
                  </p>
                </>
              )}
            </Col>
          </Row>
        )}
      </div>
    </Container>
  );
};

export default CheckoutPlateOrder;

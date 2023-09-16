import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useAuth } from "../../../contextProviders/AuthProvider";
import useFetch from "../../../utils/customHooks/useFetch";
import { getCalcCart } from "../../../services/api/cartApi/calcCartApi";
import { useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import Placeholder from "react-bootstrap/Placeholder";
import Alert from "react-bootstrap/Alert";

const CheckoutPlateCart = ({ clickHandler, loadingHandler }) => {
  const { cart } = useAuth();
  const additionalS = cart.itemsSelectedcart !== 1 ? "s" : "";

  const { data, loading, error, refetch } = useFetch(getCalcCart);

  useEffect(() => {
    refetch();
  }, [cart, refetch]);

  return (
    <Container>
      <div className="cart-checkout-wrapper">
        <Row className="justify-content-center cart-checkout-button-wrapper">
          <Button className="cart-checkout-button" onClick={clickHandler}>
            <span className="cart-text">
              {loadingHandler ? (
                <Spinner animation="border" variant="light" size="sm" />
              ) : (
                "Check out"
              )}
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
              {data && cart && (
                <>
                  <p className="cart-checkout-info-p">Your cart</p>
                  <p className="cart-checkout-info-p">
                    Item{additionalS}: {cart.itemsSelectedQuantity}
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
              {data && cart && (
                <>
                  <p className="cart-checkout-info-p">
                    {cart.itemsSelectedQuantity} item{additionalS}
                  </p>
                  <p className="cart-checkout-info-p">
                    {data.totalWeight / 100} kg
                  </p>
                  <p className="cart-checkout-info-p">{data.totalSum}$</p>
                </>
              )}
            </Col>
          </Row>
        )}
      </div>
    </Container>
  );
};

export default CheckoutPlateCart;

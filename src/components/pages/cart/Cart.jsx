import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import ProductPreviewCardCart from "./ProductPreviewCardCart";
import CheckoutPlate from "../../supportComponents/CheckoutPlate";
import { useAuth } from "../../supportComponents/AuthProvider";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, handleSelectAll } = useAuth();

  return (
    <Container className="mt-3 cart-wrapper" fluid>
      {Object.values(cart.items).length !== 0 ? (
        <>
          <Row>
            <h3 className="text-center">Your cart</h3>
          </Row>
          <Row>
            <Col xs={12} md={8}>
              <Row>
                <Col className="cart-select-all-wrapper">
                  <Form.Check type="checkbox" id="all">
                    <Form.Check.Input
                      type="checkbox"
                      className="cart-custom-check-box-all"
                      checked={
                        cart.itemsSelectedQuantity === cart.itemsQuantity
                      }
                      onChange={handleSelectAll}
                    />
                  </Form.Check>
                  <span className="ps-3">Select all</span>
                </Col>
                {Object.values(cart.items).map((item) => {
                  return (
                    <ProductPreviewCardCart itemId={item.id} key={item.id} />
                  );
                })}
              </Row>
            </Col>

            <Col xs={12} md={4}>
              <CheckoutPlate
                clickHandler={() => navigate("/user/main/order/1")}
              />
            </Col>
          </Row>
        </>
      ) : (
        <h3>No items yet</h3>
      )}
    </Container>
  );
};

export default Cart;

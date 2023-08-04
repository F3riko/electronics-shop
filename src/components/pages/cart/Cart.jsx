import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// Dummy data
import dummyData from "../../dummydata/electronicsData";
import ProductPreviewCardCart from "./ProductPreviewCardCart";

const Cart = () => {
  return (
    <Container className="mt-3" fluid>
      <Row>
        <h3 className="text-center">Your cart</h3>
      </Row>
      <Row>
        <Col xs={12} md={8}>
          <Row>
            <p>Select all</p>
            <Form.Check.Input
              type="checkbox"
              className="cart-custom-check-box"
            />
          </Row>
          <Row>
            <ProductPreviewCardCart
              productData={dummyData["LkxpsH1QWbtBjeyuJcN60"]}
            />
            <ProductPreviewCardCart
              productData={dummyData["LkxpsH1QWbtBjeyuJcN60"]}
            />
            <ProductPreviewCardCart
              productData={dummyData["LkxpsH1QWbtBjeyuJcN60"]}
            />
          </Row>
        </Col>

        <Col xs={12} md={4}>
          <div className="cart-checkout-wrapper">
            <div className="cart-checkout-button-wrapper">
              <Row className="justify-content-center">
                <Button className="cart-checkout-button">Check out</Button>
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
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;

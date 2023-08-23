import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import ProductPreviewCardCart from "./ProductPreviewCardCart";
import CheckoutPlate from "../../generalComponents/CheckoutPlate";

// Dummy data
import dummyData from "../../dummydata/electronicsData";

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
          <CheckoutPlate />
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;

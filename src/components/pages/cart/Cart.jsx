import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import ProductPreviewCardCart from "./ProductPreviewCardCart";
import CheckoutPlate from "../../supportComponents/CheckoutPlate";

const Cart = () => {
  const sample = {
    id: 1,
    name: "Sony Xperia L4",
    category: 2,
    price: 199,
    year_of_production: 2020,
  };

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
            <ProductPreviewCardCart productData={sample} />
            {/* <ProductPreviewCardCart
              productData={dummyData["LkxpsH1QWbtBjeyuJcN60"]}
            />
            <ProductPreviewCardCart
              productData={dummyData["LkxpsH1QWbtBjeyuJcN60"]}
            /> */}
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

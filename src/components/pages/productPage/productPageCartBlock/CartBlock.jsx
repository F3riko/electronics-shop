import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

const CartBlock = ({ price, discount }) => {
  const Price = () => {
    return (
      <>
        <Col md={discount ? 6 : 12} className="d-flex justify-content-center">
          <p className="product-page-cart-block-price">{price}</p>
        </Col>
        {discount && (
          <Col md={6} className="d-flex justify-content-center">
            <p className="product-page-cart-block-discount">discount</p>
          </Col>
        )}
      </>
    );
  };
  return (
    <Container className="product-page-cart-block-container">
      <Row>
        <Price />
      </Row>
      <Row>
        <Button variant="success">{discount}</Button>
      </Row>
      <Row className="mt-2">
        <Button variant="danger">Wishlist</Button>
      </Row>
    </Container>
  );
};

export default CartBlock;

import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

const NoProductsCard = () => {
  return (
    <Row className="justify-content-center align-items-center no-products-card-body">
      <Col className="text-center">
        <h3>Sorry! No products available in this category...</h3>
        <p>You can try another category or use a search bar!</p>
      </Col>
    </Row>
  );
};

export default NoProductsCard;

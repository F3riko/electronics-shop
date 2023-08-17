import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

const OrderPaymentMethods = ({ selectedMethod, setSelectedMethod }) => {
  return (
    <Container className="order-page-payment-choice-wrapper g-0">
      <Row>
        <h6 className="order-page-payment-header">Payment method</h6>
      </Row>
      <Row className="d-flex flex-row">
        <Col className="order-page-payment-card-wrapper" xs={4}>
          <p className="order-page-payment-card-text">Add new card</p>
        </Col>
        <Col className="order-page-payment-card-wrapper" xs={4}>
          <p className="order-page-payment-card-text">Add new card</p>
        </Col>
        <Col className="order-page-payment-card-wrapper" xs={4}>
          <p className="order-page-payment-card-text">Add new card</p>
        </Col>
      </Row>
      <Row>
        
      </Row>
    </Container>
  );
};

export default OrderPaymentMethods;

import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

const OrderPaymentMethods = ({
  selectedMethod,
  setSelectedMethod,
  deliveryMethod,
}) => {
  const paymentMethods = {
    delivery: [
      { id: 1, text: "Credit Card" },
      { id: 2, text: "Debit Card" },
      { id: 3, text: "PayPal" },
    ],
    pickUp: [{ id: 4, text: "Cash" }],
  };

  const handlePaymentChoice = (id) => {
    setSelectedMethod(id);
  };

  const methodsToRender = deliveryMethod
    ? paymentMethods.delivery
    : [...paymentMethods.delivery, ...paymentMethods.pickUp];

  return (
    <Container className="order-page-payment-choice-wrapper g-0">
      <Row>
        <Col className="d-flex">
          <h6 className="order-page-payment-header">Payment method</h6>
          {selectedMethod !== null && (
            <h6 className="order-page-payment-header">
              Current choice:{" "}
              {
                methodsToRender.find((method) => method.id === selectedMethod)
                  ?.text
              }
            </h6>
          )}
        </Col>
      </Row>
      <Row className="d-flex flex-row">
        {methodsToRender.map((method) => {
          return (
            <Col
              key={method.id}
              className={`order-page-payment-card-wrapper ${
                selectedMethod === method.id
                  ? "order-page-payment-card-wrapper-selected"
                  : ""
              }`}
              xs={4}
              id={method.id}
              onClick={() => handlePaymentChoice(method.id)}
            >
              <p className="order-page-payment-card-text">{method.text}</p>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default OrderPaymentMethods;

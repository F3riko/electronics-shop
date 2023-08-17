import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useState } from "react";
import { useParams } from "react-router-dom";
import OrderPaymentMethods from "./OrderPaymentMethods";
import CheckoutPlate from "../../generalComponents/CheckoutPlate";
import DeliveryForm from "./DeliveryForm";

const OrderPage = () => {
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState({
    paymentMethodId: "",
    deliveryType: "",
    deliveryData: "",
  });

  return (
    <Container className="mx-5">
      <Row>
        <h3 className="text-center my-2">New order</h3>
      </Row>
      <Row>
        <Col xs={12} md={8}>
          <Row>
            <OrderPaymentMethods
              selectedMethod={orderData.paymentMethodId}
              setSelectedMethod={(paymentId) =>
                setOrderData((prevData) => ({
                  ...prevData,
                  paymentMethodId: paymentId,
                }))
              }
            />
          </Row>
          <Row>
            <Col>
              <DeliveryForm />
            </Col>
          </Row>
        </Col>
        <Col xs={12} md={4}>
          <CheckoutPlate orderPageFlag={true} />
        </Col>
      </Row>
    </Container>
  );
};

export default OrderPage;

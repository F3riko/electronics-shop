import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import OrderPaymentMethods from "./OrderPaymentMethods";
import CheckoutPlate from "../../supportComponents/CheckoutPlate";
import DeliveryForm from "./DeliveryForm";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { useParams } from "react-router-dom";
import AddressPlate from "./AddressPlate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const OrderPage = () => {
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState({
    paymentMethodId: null,
    deliveryMethodId: null,
    delivery: true,
    showForm: false,
    deliveryData: [
      {
        id: 1,
        name: "Name",
        surname: "Surname",
        email: "admin1@gmail.com",
        phone: "05823423434",
        zip: "3392352",
        city: "Haifa",
        street: "Masada",
        address: "building #9",
        additionalInfo: "Don't touch delivery bell, please",
      },
      {
        id: 2,
        name: "Name",
        surname: "Surname",
        email: "admin1@gmail.com",
        phone: "05823423434",
        zip: "3392352",
        city: "Haifa",
        street: "Masada",
        address: "building #9",
        additionalInfo: "Don't touch delivery bell, please",
      },
      {
        name: "Name",
        surname: "Surname",
        email: "admin1@gmail.com",
        phone: "05823423434",
        zip: "3392352",
        city: "Haifa",
        street: "Masada",
        address: "building #9",
        additionalInfo: "Don't touch delivery bell, please",
      },
    ],
    pickUpData: [
      {
        id: 99,
        name: "Name",
        surname: "Surname",
        email: "admin1@gmail.com",
        phone: "05823423434",
        zip: "3392352",
        city: "Haifa",
        street: "Masada",
        address: "building #9",
        additionalInfo: "Don't touch delivery bell, please",
      },
    ],
  });

  const addressDataArray = orderData.delivery
    ? orderData.deliveryData
    : orderData.pickUpData;

  useEffect(() => {
    // Fill deliveryData array with user's addresses from the server
  }, []);

  useEffect(() => {
    setOrderData((prevData) => ({
      ...prevData,
      paymentMethodId: null,
    }));
  }, [orderData.delivery]);

  const handleSwitchChange = () => {
    setOrderData((prevValue) => ({
      ...prevValue,
      delivery: !prevValue.delivery,
      showForm: false,
    }));
  };

  return (
    <Container className="order-wrapper">
      <Row>
        <h3 className="text-center my-2">New order #{orderId}</h3>
      </Row>
      <Row>
        <Col xs={12} md={8}>
          <Row>
            <Col>
              <OrderPaymentMethods
                deliveryMethod={orderData.delivery}
                selectedMethod={orderData.paymentMethodId}
                setSelectedMethod={(paymentId) =>
                  setOrderData((prevData) => ({
                    ...prevData,
                    paymentMethodId: paymentId,
                  }))
                }
              />
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-between align-items-center mx-5 p-3">
              <h5 className="m-0">
                {orderData.delivery ? "Delivery" : "Pickup"}
              </h5>
              <BootstrapSwitchButton
                onlabel="Delivery"
                offlabel="Pickup"
                checked={orderData.delivery}
                width={100}
                onChange={handleSwitchChange}
              />
            </Col>
          </Row>
          <Row>
            {addressDataArray.map((address) => {
              return (
                <Col md={6} xs={12}>
                  <AddressPlate
                    addressData={address}
                    selected={address.id === orderData.deliveryMethodId}
                    handleSelect={(methodId) =>
                      setOrderData((prevData) => ({
                        ...prevData,
                        deliveryMethodId: methodId,
                      }))
                    }
                    delivery={orderData.delivery}
                  />
                </Col>
              );
            })}
            {orderData.delivery && (
              <Col
                md={6}
                xs={12}
                className="mb-3"
                onClick={() =>
                  setOrderData((prevData) => ({ ...prevData, showForm: true }))
                }
              >
                <Container className="order-page-new-address-wrapper">
                  <FontAwesomeIcon icon={faLocationDot} size="2xl" />
                  <h5 className="text-center mt-2">Add new address</h5>
                </Container>
              </Col>
            )}
          </Row>
          {orderData.showForm && (
            <Row>
              <Col>
                <DeliveryForm />
              </Col>
            </Row>
          )}
        </Col>
        <Col xs={12} md={4}>
          <CheckoutPlate orderPageFlag={true} />
        </Col>
      </Row>
    </Container>
  );
};

export default OrderPage;

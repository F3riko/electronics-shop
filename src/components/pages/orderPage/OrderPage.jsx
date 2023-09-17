import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OrderPaymentMethods from "./OrderPaymentMethods";
import CheckoutPlateOrder from "./CheckoutPlateOrder";
import DeliveryForm from "../../forms/usualForms/DeliveryForm";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import AddressPlate from "../../shared/AddressPlate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { nanoid } from "nanoid";
import { getOrderInfoById } from "../../../services/api/orderApi/getOrderInfoApi";
import { useAuth } from "../../../contextProviders/AuthProvider";
import { getUserAddresses } from "../../../services/api/userApi/getUserAddressesApi";
import { getPickUpPointsApi } from "../../../services/api/orderApi/getPickUpPointsApi";
import useFetch from "../../../utils/customHooks/useFetch";
import PaymentPlaceholder from "./PaymentPlaceholder";
import { processOrderPayment } from "../../../services/api/orderApi/processOrderPaymentApi";

const OrderPage = () => {
  const [orderData, setOrderData] = useState({
    paymentMethodId: null,
    deliveryMethodId: null,
    delivery: true,
    showForm: false,
    deliveryData: [],
    pickUpData: [],
  });
  const [paymentModal, setPaymentModal] = useState(false);
  const [fetchStatus, setFetchStatus] = useState({
    formDataError: false,
  });
  const { orderId } = useParams();
  const { user } = useAuth();
  const { data, error, loading } = useFetch(getOrderInfoById, orderId);
  const { data: addressData, refetch } = useFetch(getUserAddresses, user?.id);
  const { data: pickUpData } = useFetch(getPickUpPointsApi);
  const addressDataArray = orderData.delivery
    ? orderData.deliveryData
    : orderData.pickUpData;

  useEffect(() => {
    if (addressData) {
      setOrderData((prevValue) => ({
        ...prevValue,
        deliveryData: addressData,
      }));
    }
  }, [addressData]);

  useEffect(() => {
    if (pickUpData) {
      setOrderData((prevValue) => ({
        ...prevValue,
        pickUpData: pickUpData,
      }));
    }
  }, [pickUpData]);

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

  const handlePay = async () => {
    try {
      if (!orderData.deliveryMethodId) {
        throw new Error("delivery method");
      } else if (!orderData.paymentMethodId) {
        throw new Error("payment method");
      }
      const orderDataFinal = {
        paymentId: orderData.paymentMethodId,
        addressId: orderData.deliveryMethodId,
        deliveryMethod: orderData.delivery ? "delivery" : "pick up",
      };
      await processOrderPayment(user.id, orderId, ...Object.values(orderDataFinal))
      setPaymentModal(true);
    } catch (error) {
      let errorMsg;
      if (
        error.message === "delivery method" ||
        error.message === "payment method"
      ) {
        errorMsg = error.message;
      } else {
        errorMsg = "An error occured";
      }
      setFetchStatus((prevData) => ({
        ...prevData,
        formDataError: errorMsg,
      }));
    } finally {
      setTimeout(() => {
        setFetchStatus((prevData) => ({
          ...prevData,
          formDataError: false,
        }));
      }, 3000);
    }
  };

  return (
    <>
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
                  <Col md={6} xs={12} key={nanoid()}>
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
                    setOrderData((prevData) => ({
                      ...prevData,
                      showForm: true,
                    }))
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
                  <DeliveryForm
                    refetch={refetch}
                    handleClose={() =>
                      setOrderData((prevData) => ({
                        ...prevData,
                        showForm: false,
                      }))
                    }
                  />
                </Col>
              </Row>
            )}
          </Col>
          <Col xs={12} md={4}>
            <CheckoutPlateOrder
              loading={loading}
              error={error}
              itemsQuantity={data?.items?.length}
              orderData={data?.order}
              clickHandler={handlePay}
              paymentError={fetchStatus.formDataError}
            />
          </Col>
        </Row>
      </Container>
      <PaymentPlaceholder
        show={paymentModal}
        handleClose={() => setPaymentModal(false)}
        orderId={orderId}
      />
    </>
  );
};

export default OrderPage;

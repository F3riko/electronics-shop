import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReceipt } from "@fortawesome/free-solid-svg-icons";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ReceiptModal from "../../shared/ReceiptModal";
import { useAuth } from "../../../contextProviders/AuthProvider";
import formatDate from "../../../utils/orderOperations/formatDate";
import { nanoid } from "nanoid";

const OrderHistory = () => {
  const { orderHistory, updateOrderHistoryFromServer, user } = useAuth();
  const [receipt, setReceipt] = useState({ show: false, id: null });
  const handleCloseReceipt = () => {
    setReceipt((prevValue) => ({ ...prevValue, show: false }));
  };

  useEffect(() => {
    (async () => {
      await updateOrderHistoryFromServer(user.id);
    })();
  }, []);

  const OrderInfo = ({ orderInfo, index }) => {
    return (
      <Row className="o-history-order">
        <Col>{orderHistory.length - index}</Col>
        <Col>{orderInfo.id}</Col>
        <Col>{formatDate(orderInfo.order_date)}</Col>
        <Col>
          <FontAwesomeIcon
            onClick={() => {
              setReceipt({ show: true, id: orderInfo.id });
            }}
            icon={faReceipt}
            size="xl"
            style={{ color: "#0d6efd" }}
          />
        </Col>
      </Row>
    );
  };

  return (
    <Container>
      {orderHistory.length === 0 && (
        <h3 className="my-5 py-5 text-center">
          Oops, your order history is empty!
        </h3>
      )}
      {orderHistory && (
        <>
          <p className="mb-4 text-center" style={{ fontSize: "18px" }}>
            Welcome to your order history! Here, you can conveniently review
            your past orders and access receipts when needed!
          </p>
          <Row className="o-history-header">
            <Col>Order no.</Col>
            <Col>Order ref.</Col>
            <Col>Order date</Col>
            <Col>Show receipt</Col>
          </Row>
          {orderHistory &&
            orderHistory.map((order, index) => {
              return (
                <OrderInfo key={nanoid()} index={index} orderInfo={order} />
              );
            })}
          {receipt.id && (
            <ReceiptModal
              handleClose={handleCloseReceipt}
              orderId={receipt.id}
              showInitial={receipt.show}
            />
          )}
        </>
      )}
    </Container>
  );
};

export default OrderHistory;

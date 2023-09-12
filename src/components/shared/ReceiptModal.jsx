import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import useFetch from "../../utils/customHooks/useFetch";
import NoDataError from "./NoDataError";
import LoadingSpinner from "./LoadingSpinner";
import formatDate from "../../utils/orderOperations/formatDate";
import { getOrderInfoById } from "../../services/api/orderApi/getOrderInfoApi";
import { useAuth } from "../../contextProviders/AuthProvider";
import { nanoid } from "nanoid";

const ReceiptModal = ({ showInitial, handleClose, orderId }) => {
  const { user } = useAuth();
  const { data, loading, error } = useFetch(
    getOrderInfoById,
    parseInt(orderId)
  );

  const ProductDataShort = ({ productData }) => {
    return (
      <Row key={nanoid()}>
        <Col xs={6}>
          <span>{productData.title}</span>
        </Col>
        <Col xs={2} className="ps-4 pe-0">
          <span>{productData.quantity}</span>
        </Col>
        <Col className="px-0">
          <span>{productData.price}$</span>
        </Col>
        <Col className="ps-3 pe-0">
          <span>{productData.price * productData.quantity}$</span>
        </Col>
      </Row>
    );
  };

  return (
    <Modal
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={showInitial}
      onHide={handleClose}
    >
      <Modal.Header closeButton className="" />
      {data && (
        <Modal.Body className="invoice-wrapper">
          <Container>
            <Row>
              <h4 className="text-center mb-3">INVOICE</h4>
            </Row>
            <Row>
              <Col className="d-flex flex-column receipt-header-info-wrapper">
                <span>Invoice Number:</span>
                <span>Cashier:</span>
                <span>Customer id:</span>
              </Col>
              <Col className="d-flex flex-column">
                <span>{orderId}</span>
                <span>Administrator</span>
                <span>{user.id}</span>
              </Col>
            </Row>
            <Row className="receipt-items-header-title">
              <Col xs={6}>
                <span>ITEM</span>
              </Col>
              <Col>
                <span>QTY</span>
              </Col>
              <Col>
                <span>PRICE</span>
              </Col>
              `
              <Col>
                <span>AMOUNT</span>
              </Col>
            </Row>
            {data &&
              data.items.map((item) => {
                return <ProductDataShort productData={item} />;
              })}
            <Row className="receipt-bottom-info-wrapper">
              <Col className="d-flex flex-column">
                <span className="receipt-header-info-title">Order date:</span>
              </Col>
              <Col className="d-flex flex-column text-end pe-4">
                <span>{formatDate(data.order.order_date)}</span>
              </Col>
            </Row>
            <Row className="receipt-total">
              <Col>Total:</Col>
              <Col className="pe-4 text-end">{data.order.order_total}$</Col>
            </Row>
          </Container>
        </Modal.Body>
      )}
      {loading && <LoadingSpinner />}
      {error && <NoDataError />}
      <Modal.Footer>
        <Button className="w-100 py-2" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReceiptModal;

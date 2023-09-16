import { useState, useEffect, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import ReceiptModal from "../../shared/ReceiptModal";

const PaymentPlaceholder = ({ show, handleClose, orderId }) => {
  const [paid, setPaid] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [receipt, setReceipt] = useState({ show: false, id: null });
  const fakeTransactionIdRef = useRef(nanoid());
  const navigate = useNavigate();

  useEffect(() => {
    if (show) {
      const delay = setTimeout(() => {
        setPaid(true);
      }, 5000);
      return () => {
        clearTimeout(delay);
      };
    }
  }, [show]);

  useEffect(() => {
    if (paid) {
      const closeTimeout = setTimeout(() => {
        handleClose();
        setReceipt({ show: true, id: orderId });
      }, 5000);
      const countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
      return () => {
        clearTimeout(closeTimeout);
        clearInterval(countdownInterval);
      };
    }
  }, [paid, handleClose, navigate]);

  const handleCloseReceipt = () => {
    setReceipt((prevValue) => ({ ...prevValue, show: false }));
    navigate("/");
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body className="d-flex align-items-center flex-column">
          <span className="payment-text">
            {paid ? "Payment Successful!" : "Payment is in progress..."}
          </span>
          {paid && (
            <span className="payment-text-transaction">
              Transaction number: {fakeTransactionIdRef.current}
            </span>
          )}
          {paid ? (
            <FontAwesomeIcon
              className="payment-icon-success"
              icon={faCheck}
              beat
              size="2xl"
              style={{ color: "#09ce30" }}
            />
          ) : (
            <Spinner
              className="payment-spinner"
              animation="border"
              variant="primary"
            />
          )}
          {paid && (
            <span className="payment-text-countdown">
              This window will close in: {countdown} seconds
            </span>
          )}
        </Modal.Body>
      </Modal>
      {receipt && (
        <ReceiptModal
          handleClose={handleCloseReceipt}
          orderId={receipt.id}
          showInitial={receipt.show}
        />
      )}
    </>
  );
};

export default PaymentPlaceholder;

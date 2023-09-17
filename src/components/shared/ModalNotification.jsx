import Modal from "react-bootstrap/Modal";

const ModalNotification = ({ showInitial, handleClose, message }) => {
  return (
    <>
      <Modal show={showInitial} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="py-1">{message}</p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalNotification;

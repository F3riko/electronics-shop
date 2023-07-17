import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

const SignUpConfirmation = ({ showInitial, handleClose }) => {
  return (
    <>
      <Modal show={showInitial} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Account confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Almost there, let's confirm your email!</p>
          <p>
            We've sent you email letter, check your inbox and confirm your
            email. You will be redirected back to continue your shopping.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Resend email
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SignUpConfirmation;

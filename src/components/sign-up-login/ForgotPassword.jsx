import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { resetPassMsg } from "../../services/api/resetPassMsg-api";

const ForgotPassword = ({ handleClose, showInitial }) => {
  const navigate = useNavigate();
  const [emailForgotPass, setEmailForgotPass] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;
    setEmailForgotPass(value);
  };

  const handleSubmit = async (e) => {
    console.log(emailForgotPass);
    e.preventDefault();

    try {
      const { status, data } = await resetPassMsg(emailForgotPass);
      console.log("Server response status:", status);
      if (status === 200) {
        navigate(data);
        handleClose();
      } else {
        // Temp
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Modal show={showInitial} onHide={handleClose}>
        <Modal.Header closeButton className="justify-content-between">
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="email">
              <FloatingLabel
                controlId="email"
                label="Email address"
                className="mb-3"
              >
                <Form.Control
                  onChange={handleChange}
                  type="email"
                  placeholder="Email address"
                  required
                  defaultValue={emailForgotPass}
                />
              </FloatingLabel>
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 py-3">
              Reset
            </Button>
          </Modal.Body>
        </Form>
      </Modal>
    </>
  );
};

export default ForgotPassword;

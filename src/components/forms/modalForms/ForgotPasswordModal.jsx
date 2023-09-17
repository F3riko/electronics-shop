import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Spinner from "react-bootstrap/Spinner";
import "bootstrap/dist/css/bootstrap.min.css";
import { resetPassMsg } from "../../../services/authService/userAuth/authentication/getResetPassMsg";
import { defaultResetMsgData } from "../../../utils/validations/resetPassMsgValidations";
import ValidationErrorElement from "../../shared/ValidationError";
import {
  handleChange,
  validateAllInput,
  renderErrors,
} from "../../../utils/validations/validationFunctions";
import ModalNoticiation from "../../shared/ModalNotification";

const ForgotPassword = ({ handleClose, showInitial }) => {
  const [emailForgotPass, setEmailForgotPass] = useState(defaultResetMsgData);
  const [notificationShow, setNotificationShow] = useState(false);
  const [fetchStatus, setFetchStatus] = useState({
    loading: false,
    error: false,
    errorMsg: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let errors = validateAllInput(emailForgotPass, setEmailForgotPass);
      if (!errors) {
        setFetchStatus((prevData) => ({ ...prevData, loading: true }));
        await resetPassMsg(emailForgotPass.email.value);
        setNotificationShow(true);
        setEmailForgotPass(defaultResetMsgData);
        handleClose();
      }
    } catch (error) {
      setFetchStatus((prevData) => ({ ...prevData, error: true }));
      setTimeout(() => {
        setFetchStatus((prevData) => ({ ...prevData, error: false }));
      }, 3000);
    } finally {
      setFetchStatus((prevData) => ({ ...prevData, loading: false }));
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
                  onChange={(e) => handleChange(e, setEmailForgotPass)}
                  type="email"
                  placeholder="Email address"
                  required
                  value={emailForgotPass.email.value}
                />
                <Form.Text className="text-center">
                  {renderErrors("email", emailForgotPass)}
                  {fetchStatus.error && <ValidationErrorElement />}
                </Form.Text>
              </FloatingLabel>
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 py-3">
              {fetchStatus.loading ? (
                <Spinner animation="border" variant="light" />
              ) : (
                "Reset"
              )}
            </Button>
          </Modal.Body>
        </Form>
      </Modal>
      <ModalNoticiation
        message={
          "If this email address is registered, an email will be sent to it containing instructions to reset your password. Please follow the link provided in the email to initiate the password reset process."
        }
        handleClose={() => setNotificationShow(false)}
        showInitial={notificationShow}
      />
    </>
  );
};

export default ForgotPassword;

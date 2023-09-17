import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Spinner from "react-bootstrap/Spinner";
import "bootstrap/dist/css/bootstrap.min.css";
import { resetPass } from "../../../services/authService/userAuth/authentication/userResetPass";
import { useNavigate, useLocation } from "react-router-dom";
import { resetPassDefaultData } from "../../../utils/validations/resetPassValidations";
import {
  arePasswordsSame,
  handleBlur,
  handleChange,
  renderErrors,
  validateAllInput,
} from "../../../utils/validations/validationFunctions";
import ValidationErrorElement from "../../shared/ValidationError";
import ModalNoticiation from "../../shared/ModalNotification";

const ForgotPassword = () => {
  const [modalShow, setModalShow] = useState(true);
  const [notificationShow, setNotificationShow] = useState(false);
  const [resetPassData, setResetPassData] = useState(resetPassDefaultData);
  const [fetchStatus, setFetchStatus] = useState({
    loading: false,
    error: false,
    errorMessage: false,
  });
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const resetToken = queryParams.get("resetToken");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let errors = validateAllInput(resetPassData, setResetPassData);
      let passwordError = arePasswordsSame(resetPassData, setResetPassData);
      if (!errors && !passwordError) {
        setFetchStatus((prevData) => ({ ...prevData, loading: true }));
        await resetPass(resetPassData.password.value, resetToken);
        setResetPassData(resetPassDefaultData);
        setNotificationShow(true);
        setTimeout(() => {
          navigate("/");
        }, 5000);
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
      <Modal
        show={modalShow}
        onHide={() => {
          navigate("/");
        }}
        centered
      >
        <Modal.Header closeButton className="justify-content-between">
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="password">
              <FloatingLabel controlId="password" label="Password">
                <Form.Control
                  onChange={(e) => handleChange(e, setResetPassData)}
                  onBlur={(e) => handleBlur(e, resetPassData, setResetPassData)}
                  type="password"
                  placeholder="Password"
                  value={resetPassData.password.value}
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="repeatPassword">
              <FloatingLabel controlId="repeatPassword" label="Repeat password">
                <Form.Control
                  onChange={(e) => handleChange(e, setResetPassData)}
                  onBlur={(e) => handleBlur(e, resetPassData, setResetPassData)}
                  type="password"
                  placeholder="Repeat password"
                  value={resetPassData.repeatPassword.value}
                  required
                />
                <Form.Text className="text-center">
                  {renderErrors("repeatPassword", resetPassData)}
                  {renderErrors("password", resetPassData)}
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
          "Your password reset was successful! You will be automatically redirected to the main page in 5 seconds!"
        }
        handleClose={() => setNotificationShow(false)}
        showInitial={notificationShow}
      />
    </>
  );
};

export default ForgotPassword;

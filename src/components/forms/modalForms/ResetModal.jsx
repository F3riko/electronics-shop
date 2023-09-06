import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import "bootstrap/dist/css/bootstrap.min.css";
import { resetPass } from "../../../services/authService/userAuth/authentication/userResetPass";
import { useNavigate, useLocation } from "react-router-dom";
import { nanoid } from "nanoid";
import { resetPassword } from "../../../utils/validations/resetPassValidations";
import {
  arePasswordsSame,
  validateInput,
} from "../../../utils/validations/singUpValidations";

const ForgotPassword = () => {
  const [resetPassData, setResetPassData] = useState(resetPassword);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const resetToken = queryParams.get("resetToken");

  const handleFieldChange = (event) => {
    const { id, value } = event.target;
    setResetPassData((prevFormData) => ({
      ...prevFormData,
      [id]: { ...prevFormData[id], value: value, errors: [] },
    }));
  };

  const validateField = (fieldId) => {
    const errors =
      fieldId === "repeatPassword"
        ? [
            arePasswordsSame(
              resetPassData[fieldId].value,
              resetPassData.password.value
            ),
          ]
        : validateInput(fieldId, resetPassData);
    if (errors && errors[0]) {
      setResetPassData((prevFormData) => ({
        ...prevFormData,
        [fieldId]: { ...prevFormData[fieldId], errors: errors },
      }));
    }
  };

  const handleFieldBlur = (event) => {
    const { id } = event.target;
    validateField(id);
  };

  const renderErrors = (formDataKey) => {
    let errors;
    if (resetPassData[formDataKey].errors) {
      errors = resetPassData[formDataKey].errors.map((error) => {
        return (
          <small key={nanoid()}>
            {error}
            <br />
          </small>
        );
      });
    }
    return errors ? errors : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasErrors = false;

    for (const fieldId in resetPassData) {
      const fieldValue = resetPassData[fieldId].value;
      if (!fieldValue) {
        setResetPassData((prevFormData) => ({
          ...prevFormData,
          [fieldId]: {
            ...prevFormData[fieldId],
            errors: ["Shouldn't be empty"],
          },
        }));
        hasErrors = true;
        break;
      }
      validateField(fieldId);
    }

    if (!hasErrors) {
      try {
        const { status } = await resetPass(
          resetPassData.password.value,
          resetToken
        );
        console.log("Server response status:", status);
        if (status === 200) {
          navigate(`/user/main`);
          handleClose();
        } else {
          // Temp
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  const navigate = useNavigate();

  const [showInitial, setShowInitial] = useState(true);

  const handleClose = () => {
    setShowInitial(false);
  };

  return (
    <>
      <Modal show={showInitial} onHide={handleClose}>
        <Modal.Header closeButton className="justify-content-between">
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="password">
              <FloatingLabel controlId="password" label="Password">
                <Form.Control
                  onChange={handleFieldChange}
                  onBlur={handleFieldBlur}
                  type="password"
                  placeholder="Password"
                  defaultValue={resetPassData.password.value}
                />
                <Form.Text className="text-center">
                  {renderErrors("password")}
                </Form.Text>
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="repeatPassword">
              <FloatingLabel controlId="repeatPassword" label="Repeat password">
                <Form.Control
                  onChange={handleFieldChange}
                  onBlur={handleFieldBlur}
                  type="password"
                  placeholder="Repeat password"
                  defaultValue={resetPassData.repeatPassword.value}
                />
                <Form.Text className="text-center">
                  {renderErrors("repeatPassword")}
                </Form.Text>
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

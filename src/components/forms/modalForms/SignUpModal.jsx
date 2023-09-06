import { useEffect, useState } from "react";
import SignUpConfirmation from "./SignUpConfirmationModal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  arePasswordsSame,
  defaultSignUpData,
  validateInput,
} from "../../../utils/validations/singUpValidations";
import { nanoid } from "nanoid";
import ReCAPTCHA from "react-google-recaptcha";
import { submitUser } from "../../../services/authService/userAuth/authentication/userSignUp";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contextProviders/AuthProvider";
import Cookies from "js-cookie";

// const secretKey = process.env.REACT_APP_SECRET_KEY;
// const siteKey = process.env.REACT_APP_SITE_KEY;

// Current issues
// 1. validate the reCAPTCHA response by making a request to the reCAPTCHA API with  secret key and the recaptchaResponse value. The reCAPTCHA API will verify the response and provide server with the validation result.
// 2. alert or simple error msg under captcha object
// 3. Save the keys into the env file

function SignUpForm({ showInitial, handleClose }) {
  const { login } = useAuth();

  const navigate = useNavigate();
  const [confirmationShow, setConfirmationShow] = useState(false);
  // Form data
  const [signUpData, setSignUpData] = useState(defaultSignUpData);

  // reCaptcha
  const handleRecaptchaChange = (value) => {
    if (typeof value === "string") {
      setSignUpData((prevData) => ({
        ...prevData,
        recaptchaResponse: { ...prevData.recaptchaResponse, value: value },
      }));
    }
  };

  useEffect(() => {
    setSignUpData(defaultSignUpData);
  }, [showInitial]);

  const handleFieldChange = (event) => {
    const { id, value } = event.target;
    setSignUpData((prevFormData) => ({
      ...prevFormData,
      [id]: { ...prevFormData[id], value: value, errors: [] },
    }));
  };

  const validateField = (fieldId) => {
    const errors =
      fieldId === "repeatPassword"
        ? [
            arePasswordsSame(
              signUpData[fieldId].value,
              signUpData.password.value
            ),
          ]
        : validateInput(fieldId, signUpData);
    if (errors && errors[0]) {
      setSignUpData((prevFormData) => ({
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
    if (signUpData[formDataKey].errors) {
      errors = signUpData[formDataKey].errors.map((error) => {
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

    for (const fieldId in signUpData) {
      const fieldValue = signUpData[fieldId].value;
      if (!fieldValue) {
        setSignUpData((prevFormData) => ({
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
      // bcrypt for password here
      const newUser = {
        password: signUpData.password.value,
        email: signUpData.email.value,
        name: signUpData.name.value,
        recaptchaResponse: signUpData.recaptchaResponse.value,
      };
      const response = await submitUser(newUser);
      if (response.status === 200) {
        const openDataCookie = Cookies.get("openData");
        if (openDataCookie !== "undefined") {
          const email = JSON.parse(openDataCookie);
          const userData = { email };
          login(userData);
          navigate("/user/main");
          handleClose();
        }

        // For future email confirmation - pop up window
        // setConfirmationShow(true);
      } else {
        // Display server error in sign up form here
      }
    }
  };

  return (
    <>
      <Modal show={showInitial} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit} noValidate>
            <Form.Group className="mb-3" controlId="name">
              <FloatingLabel controlId="name" label="Name" className="mb-3">
                <Form.Control
                  onChange={handleFieldChange}
                  onBlur={handleFieldBlur}
                  type="text"
                  placeholder="Name"
                  defaultValue={signUpData.name.value}
                />
                <Form.Text className="text-center">
                  {renderErrors("name")}
                </Form.Text>
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <FloatingLabel controlId="email" label="Email">
                <Form.Control
                  onChange={handleFieldChange}
                  onBlur={handleFieldBlur}
                  type="email"
                  placeholder="Email"
                  defaultValue={signUpData.email.value}
                />
                <Form.Text className="text-center">
                  {renderErrors("email")}
                </Form.Text>
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <FloatingLabel controlId="password" label="Password">
                <Form.Control
                  onChange={handleFieldChange}
                  onBlur={handleFieldBlur}
                  type="password"
                  placeholder="Password"
                  defaultValue={signUpData.password.value}
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
                  defaultValue={signUpData.repeatPassword.value}
                />
                <Form.Text className="text-center">
                  {renderErrors("repeatPassword")}
                </Form.Text>
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="d-flex flex-column align-items-center">
              <ReCAPTCHA
                sitekey={"6Lfw7isnAAAAAAi267MVBNtNf4nxi-Rs7cXsrc44"}
                onChange={handleRecaptchaChange}
              />
              <Form.Text className="text-center">
                {renderErrors("recaptchaResponse")}
              </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 p-3 mt-2">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <SignUpConfirmation
        showInitial={confirmationShow}
        handleClose={() => {
          setConfirmationShow(false);
        }}
      />
    </>
  );
}

export default SignUpForm;

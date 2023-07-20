import { useEffect, useState } from "react";
import SignUpConfirmation from "./SignUpConfirmation";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import "bootstrap/dist/css/bootstrap.min.css";
import { arePasswordsSame, defaultSignUpData } from "./singUpValidations";
import { validateInput } from "./singUpValidations";
import { nanoid } from "nanoid";
import shortHash from "short-hash";
import ReCAPTCHA from "react-google-recaptcha";

const secretKey = process.env.REACT_APP_SECRET_KEY;
const siteKey = process.env.REACT_APP_SITE_KEY;

// Current issues
// 1. validate the reCAPTCHA response by making a request to the reCAPTCHA API with  secret key and the recaptchaResponse value. The reCAPTCHA API will verify the response and provide server with the validation result.
// 2. alert or simple error msg under captcha object
// 3. Save the keys into the env file

function SignUpForm({ showInitial, handleClose }) {
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
    console.log(secretKey);
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

  const handleSubmit = (e) => {
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
      // Create new user
      const newUser = {
        id: nanoid(),
        accessToken: nanoid(),
        registrationData: new Date(),
      };

      // Populate newUser object with form data
      for (const key in signUpData) {
        if (key !== "repeatPassword") {
          newUser[key] =
            key === "password"
              ? shortHash(signUpData[key].value)
              : signUpData[key].value;
        }
      }

      // Send data to server
      console.log(newUser);
      // Perform any necessary actions (e.g., close modal, navigate, etc.)
      handleClose();
      setConfirmationShow(true);
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

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>

        <Modal.Footer className="justify-content-between"></Modal.Footer>
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

import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Spinner from "react-bootstrap/esm/Spinner";
import "bootstrap/dist/css/bootstrap.min.css";
import { defaultSignUpData } from "../../../utils/validations/singUpValidations";
import ReCAPTCHA from "react-google-recaptcha";
import { submitUser } from "../../../services/authService/userAuth/authentication/userSignUp";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contextProviders/AuthProvider";
import {
  renderErrors,
  handleBlur,
  handleChange,
  validateAllInput,
  handleRecaptchaChange,
  arePasswordsSame,
} from "../../../utils/validations/validationFunctions";
import ValidationErrorElement from "../../shared/ValidationError";

function SignUpForm({ showInitial, handleClose }) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useState(defaultSignUpData);
  const [fetchStatus, setFetchStatus] = useState({
    loading: false,
    error: false,
    errorMessage: false,
  });

  useEffect(() => {
    setSignUpData(defaultSignUpData);
  }, [showInitial]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let errors = validateAllInput(signUpData, setSignUpData);
      let passwordError = arePasswordsSame(signUpData, setSignUpData);
      if (!errors && !passwordError) {
        setFetchStatus((prevData) => ({ ...prevData, loading: true }));
        const newUser = {
          password: signUpData.password.value,
          email: signUpData.email.value,
          name: signUpData.name.value,
          recaptchaResponse: signUpData.recaptchaResponse.value,
        };
        await submitUser(newUser);
        login();
        navigate("/user/main");
        handleClose();
      }
    } catch (error) {
      if (error.response.data === "User already exists") {
        setFetchStatus((prevData) => ({
          ...prevData,
          errorMessage: "User with this email aready exists",
        }));
        setTimeout(() => {
          setFetchStatus((prevData) => ({ ...prevData, errorMessage: false }));
        }, 3000);
      }
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
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="name">
              <FloatingLabel controlId="name" label="Name" className="mb-3">
                <Form.Control
                  required
                  onChange={(e) => handleChange(e, setSignUpData)}
                  onBlur={(e) => handleBlur(e, signUpData, setSignUpData)}
                  type="text"
                  placeholder="Name"
                  value={signUpData.name.value}
                />
                <Form.Text className="text-center">
                  {renderErrors("name", signUpData)}
                </Form.Text>
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <FloatingLabel controlId="email" label="Email">
                <Form.Control
                  onChange={(e) => handleChange(e, setSignUpData)}
                  onBlur={(e) => handleBlur(e, signUpData, setSignUpData)}
                  type="email"
                  placeholder="Email"
                  value={signUpData.email.value}
                  required
                />
                <Form.Text className="text-center">
                  {renderErrors("email", signUpData)}
                </Form.Text>
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <FloatingLabel controlId="password" label="Password">
                <Form.Control
                  onChange={(e) => handleChange(e, setSignUpData)}
                  onBlur={(e) => handleBlur(e, signUpData, setSignUpData)}
                  type="password"
                  placeholder="Password"
                  value={signUpData.password.value}
                  required
                />
                <Form.Text className="text-center">
                  {renderErrors("password", signUpData)}
                </Form.Text>
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="repeatPassword">
              <FloatingLabel controlId="repeatPassword" label="Repeat password">
                <Form.Control
                  onChange={(e) => handleChange(e, setSignUpData)}
                  onBlur={(e) => handleBlur(e, signUpData, setSignUpData)}
                  type="password"
                  placeholder="Repeat password"
                  value={signUpData.repeatPassword.value}
                  required
                />
                <Form.Text className="text-center">
                  {renderErrors("repeatPassword", signUpData)}
                  {fetchStatus.error && (
                    <ValidationErrorElement
                      message={fetchStatus.errorMessage}
                    />
                  )}
                </Form.Text>
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="d-flex flex-column align-items-center">
              <ReCAPTCHA
                sitekey={process.env.REACT_APP_RECAPTCHA_SECRET}
                onChange={(value) => {
                  handleRecaptchaChange(value, setSignUpData);
                }}
              />
              <Form.Text className="text-center">
                {renderErrors("recaptchaResponse", signUpData)}
              </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 p-3 mt-2">
              {fetchStatus.loading ? (
                <Spinner animation="border" variant="light" />
              ) : (
                "Submit"
              )}
            </Button>
          </Modal.Body>
        </Form>
      </Modal>
    </>
  );
}

export default SignUpForm;

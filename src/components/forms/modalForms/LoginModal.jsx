import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Spinner from "react-bootstrap/Spinner";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { loginUser } from "../../../services/authService/userAuth/authentication/userLogIn";
import { useAuth } from "../../../contextProviders/AuthProvider";
import {
  renderErrors,
  handleChange,
  handleBlur,
  validateAllInput,
} from "../../../utils/validations/validationFunctions";
import { defaultSignInData } from "../../../utils/validations/signInValidations";

const LoginForm = ({
  showInitial,
  handleClose,
  showResetPassword,
  showSignUpForm,
}) => {
  const [loginData, setLoginData] = useState(defaultSignInData);
  const [fetchStatus, setFetchSTatus] = useState({
    loading: false,
    error: false,
  });
  const navigate = useNavigate();
  const { login } = useAuth();

  const ValidationErrorElement = () => {
    return (
      <Alert variant="danger" className="login-modal-error-alert">
        Your password is incorrect or this account doesn't exist. Please reset
        your password or sign up.
      </Alert>
    );
  };

  const handleCloseLogin = () => {
    setLoginData(defaultSignInData);
    handleClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const errors = validateAllInput(loginData, setLoginData);
      if (!errors) {
        setFetchSTatus((prevData) => ({ ...prevData, loading: true }));
        const userData = {
          email: loginData.email.value,
          password: loginData.password.value,
        };
        await loginUser(userData);
        login();
        navigate("/user/main");
        handleCloseLogin();
      }
    } catch (error) {
      setLoginData(defaultSignInData);
      setFetchSTatus((prevData) => ({ ...prevData, error: true }));
      setTimeout(() => {
        setFetchSTatus((prevData) => ({ ...prevData, error: false }));
      }, 3000);
    } finally {
      setFetchSTatus((prevData) => ({ ...prevData, loading: false }));
    }
  };

  return (
    <>
      <Modal show={showInitial} onHide={handleCloseLogin}>
        <Modal.Header closeButton className="justify-content-between">
          <Modal.Title>Log in</Modal.Title>
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
                  onChange={(e) => handleChange(e, setLoginData)}
                  onBlur={(e) => handleBlur(e, loginData, setLoginData)}
                  type="email"
                  placeholder="Email address"
                  required
                  value={loginData.email.value}
                />
                <Form.Text className="text-center">
                  {renderErrors("email", loginData)}
                </Form.Text>
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <FloatingLabel controlId="password" label="Password">
                <Form.Control
                  onChange={(e) => handleChange(e, setLoginData)}
                  onBlur={(e) => handleBlur(e, loginData, setLoginData)}
                  type="password"
                  placeholder="Password"
                  required
                  value={loginData.password.value}
                />
                <Form.Text className="text-center">
                  {renderErrors("password", loginData)}
                  {fetchStatus.error && <ValidationErrorElement />}
                </Form.Text>
              </FloatingLabel>
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 py-3">
              {fetchStatus.loading ? (
                <Spinner animation="border" variant="light" />
              ) : (
                "Sign In"
              )}
            </Button>
          </Modal.Body>
          <Modal.Footer className="justify-content-between">
            <Button
              variant="link"
              className="p-0 login-btn-link"
              onClick={() => {
                handleCloseLogin();
                showResetPassword();
              }}
            >
              Can't sign in?
            </Button>
            <Button
              variant="link"
              className="p-0 login-btn-link"
              onClick={() => {
                handleCloseLogin();
                showSignUpForm();
              }}
            >
              Don't have an account?
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default LoginForm;

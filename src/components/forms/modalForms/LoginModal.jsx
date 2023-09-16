import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { loginUser } from "../../../services/authService/userAuth/authentication/userLogIn";
import { useAuth } from "../../../contextProviders/AuthProvider";
import Spinner from "react-bootstrap/Spinner";

const LoginForm = ({
  showInitial,
  handleClose,
  showResetPassword,
  showSignUpForm,
}) => {
  const defaultLoginData = {
    email: "",
    password: "",
    validationError: false,
  };
  const [loginData, setLoginData] = useState({});
  const navigate = useNavigate();

  const ValidationErrorElement = () => {
    return (
      <Alert variant="danger" className="login-modal-error-alert">
        Your password is incorrect or this account doesn't exist. Please reset
        your password or sign up.
      </Alert>
    );
  };

  const handleCloseLogin = () => {
    setLoginData(defaultLoginData);
    handleClose();
  };

  const handleChange = (e) => {
    const { value, id } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      validationError: false,
      [id]: value,
    }));
  };

  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { status, error } = await loginUser(loginData);
      setLoading(false);
      if (status === 200) {
        login();
        navigate("/user/main");
        handleCloseLogin();
      } else if (error) {
        setLoginData((prevData) => ({ ...prevData, validationError: true }));
      }
    } catch (error) {
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
                  onChange={handleChange}
                  type="email"
                  placeholder="Email address"
                  required
                  defaultValue={loginData.email}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <FloatingLabel controlId="password" label="Password">
                <Form.Control
                  onChange={handleChange}
                  type="password"
                  placeholder="Password"
                  required
                  defaultValue={loginData.password}
                />
                <Form.Text className="text-center">
                  {loginData.validationError && <ValidationErrorElement />}
                </Form.Text>
              </FloatingLabel>
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 py-3">
              {loading ? (
                <Spinner animation="border" variant="light" />
              ) : (
                "Sign In"
              )}
            </Button>
          </Modal.Body>
          <Modal.Footer className="justify-content-between">
            <Button
              variant="link"
              className="p-0"
              onClick={() => {
                handleCloseLogin();
                showResetPassword();
              }}
            >
              Can't sign in?
            </Button>
            <Button
              variant="link"
              className="p-0"
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

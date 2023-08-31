import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import LoginForm from "./sign-up-login/LoginForm";
import { useState } from "react";
import SignUpForm from "./sign-up-login/SignUpForm";
import Image from "react-bootstrap/Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import Badge from "react-bootstrap/Badge";
import CustomLink from "./supportComponents/CustomLink";
import ForgotPassword from "./sign-up-login/ForgotPassword";
import { useAuth } from "./supportComponents/AuthProvider";
import { logOutUser } from "../services/api/logOut-api";

const NavBar = () => {
  const [showModal, setShowLogin] = useState({
    login: false,
    singUp: false,
    forgotPassword: false,
  });

  const { user, logout, cart } = useAuth();

  const handleModalClose = (modalName) => {
    setShowLogin((prevValue) => ({ ...prevValue, [modalName]: false }));
  };

  const handleModalShow = (modalName) => {
    setShowLogin((prevValue) => ({ ...prevValue, [modalName]: true }));
  };

  const navigate = useNavigate();

  const handleLogOut = async () => {
    const status = await logOutUser();
    if (status) {
      logout();
      navigate("/");
    } else {
      console.error(new Error("Server error during user logout process"));
    }
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="bg-body-tertiary nav-bar-bootstrap-component sticky-top"
      >
        <Navbar.Brand onClick={() => navigate("/")}>
          <Image
            src="electroverse-logo.png"
            className="nav-bar-logo nav-bar-logo-large"
          />
          <Image
            src="small-logo.png"
            className="nav-bar-logo nav-bar-logo-small"
          />
        </Navbar.Brand>

        <Form className="d-flex nav-bar-search-field nav-bar-search-full-width">
          <Form.Control
            type="search"
            placeholder="Search Electroverse"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-success">Search</Button>
        </Form>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Button
              onClick={() => navigate("cart")}
              className="nav-bar-cart-button"
            >
              <span>Cart</span>
              <FontAwesomeIcon
                icon={faCartShopping}
                style={{ color: "#ffffff" }}
                className="nav-bar-cart-icon"
              />
              <Badge bg="light" text="dark" className="nav-bar-cart-badge">
                {cart.itemsQuantity || 0}
              </Badge>
            </Button>
            {user ? (
              <>
                <CustomLink
                  to={"/user/main"}
                  children={
                    <h6 className="mx-2 mt-2 nav-bar-user-email">
                      {user.email}
                    </h6>
                  }
                />
                <Button
                  onClick={handleLogOut}
                  className="nav-bar-logout-button"
                >
                  Log out
                </Button>
              </>
            ) : (
              <Button
                variant="primary"
                onClick={() => handleModalShow("login")}
                className="mx-3 nav-bar-login-button"
              >
                Sign in
                <FontAwesomeIcon
                  icon={faRightToBracket}
                  style={{ color: "#ffffff" }}
                  className="nav-bar-cart-icon"
                />
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <LoginForm
        showInitial={showModal.login}
        handleClose={() => handleModalClose("login")}
        showResetPassword={() => handleModalShow("forgotPassword")}
        showSignUpForm={() => handleModalShow("singUp")}
      />
      <SignUpForm
        showInitial={showModal.singUp}
        handleClose={() => handleModalClose("singUp")}
      />
      <ForgotPassword
        showInitial={showModal.forgotPassword}
        handleClose={() => {
          handleModalClose("forgotPassword");
        }}
      />
      <Outlet />
    </>
  );
};

export default NavBar;

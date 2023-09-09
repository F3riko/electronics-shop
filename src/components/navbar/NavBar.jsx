import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import LoginForm from "../forms/modalForms/LoginModal";
import { useState } from "react";
import SignUpForm from "../forms/modalForms/SignUpModal";
import Image from "react-bootstrap/Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faRightToBracket,
  // faUser,
} from "@fortawesome/free-solid-svg-icons";
import Badge from "react-bootstrap/Badge";
import CustomLink from "../shared/CustomLink";
import ForgotPassword from "../forms/modalForms/ForgotPasswordModal";
import { useAuth } from "../../contextProviders/AuthProvider";
import { logOutUser } from "../../services/authService/userAuth/authentication/userLogOut";
import Footer from "../footer/Footer";
import {
  handleModalClose,
  handleModalShow,
} from "../../utils/modals/modalHelpers";

const NavBar = () => {
  const [showModal, setShowLogin] = useState({
    login: false,
    singUp: false,
    forgotPassword: false,
  });

  const { user, logout, cart } = useAuth();

  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await logOutUser();
    } catch (error) {
    } finally {
      logout();
      navigate("/");
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
            src="images/logo/big-logo.png"
            className="nav-bar-logo nav-bar-logo-large"
          />
          <Image
            src="images/logo/small-logo.png"
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
                {/* <Button
                  variant="outline-primary"
                  className="nav-bar-user-email"
                  onClick={() => {
                    navigate("user/main");
                  }}
                >
                  <FontAwesomeIcon icon={faUser} />
                </Button> */}
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
                onClick={() => handleModalShow("login", setShowLogin)}
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
        handleClose={() => handleModalClose("login", setShowLogin)}
        showResetPassword={() =>
          handleModalShow("forgotPassword", setShowLogin)
        }
        showSignUpForm={() => handleModalShow("singUp", setShowLogin)}
      />
      <SignUpForm
        showInitial={showModal.singUp}
        handleClose={() => handleModalClose("singUp", setShowLogin)}
      />
      <ForgotPassword
        showInitial={showModal.forgotPassword}
        handleClose={() => {
          handleModalClose("forgotPassword", setShowLogin);
        }}
      />
      <Outlet />
      <Footer />
    </>
  );
};

export default NavBar;

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import LoginForm from "./sign-up-login/LoginForm";
import { useEffect, useState } from "react";
import SignUpForm from "./sign-up-login/SignUpForm";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Badge from "react-bootstrap/Badge";
import Cookies from "js-cookie";
import CustomLink from "./supportComponents/CustomLink";
import ForgotPassword from "./sign-up-login/ForgotPassword";
import { useAuth } from "./supportComponents/AuthProvider";
import { logOutUser } from "../services/api/logOut-api";

const AccountAuth = ({ handleModalShow }) => {
  return (
    <>
      <Button
        variant="primary"
        onClick={() => handleModalShow("singUp")}
        className="mx-3"
      >
        Sign up
      </Button>
      <Button
        variant="primary"
        onClick={() => handleModalShow("login")}
        className="mx-3"
      >
        Sign in
      </Button>
    </>
  );
};

const NavBar = () => {
  const [showModal, setShowLogin] = useState({
    login: false,
    singUp: false,
    forgotPassword: false,
  });
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

  const { user, logout } = useAuth();

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="bg-body-tertiary nav-bar-bootstrap-component sticky-top"
      >
        <Navbar.Brand onClick={() => navigate("/")}>
          <Image src="electroverse-logo.png" className="nav-bar-logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Row className="w-100">
            <Col md={6}>
              <Form className="d-flex nav-bar-search-field">
                <Form.Control
                  type="search"
                  placeholder="Search Electroverse"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Col>
            <Col
              md={6}
              className="d-flex justify-content-md-end align-items-center"
            >
              <Nav className="me-auto">
                <Nav.Link as={NavLink} to={"about"} className="me-3">
                  About us
                </Nav.Link>
              </Nav>
              {user ? (
                <>
                  <CustomLink
                    to={"/user/main"}
                    children={<h6 className="mx-2">{user.email}</h6>}
                  />
                  <Button onClick={handleLogOut}>Log out</Button>
                </>
              ) : (
                <AccountAuth handleModalShow={handleModalShow} />
              )}

              <Button onClick={() => navigate("cart")}>
                <span>Cart</span>
                <FontAwesomeIcon
                  icon={faCartShopping}
                  style={{ color: "#ffffff" }}
                  className="nav-bar-cart-icon"
                />
                <Badge bg="light" text="dark" className="nav-bar-cart-badge">
                  9
                </Badge>
              </Button>
            </Col>
          </Row>
        </Navbar.Collapse>
      </Navbar>

      <LoginForm
        showInitial={showModal.login}
        handleClose={() => handleModalClose("login")}
        showResetPassword={() => handleModalShow("forgotPassword")}
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

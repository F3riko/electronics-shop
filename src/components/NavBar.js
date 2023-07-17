import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Outlet, NavLink } from "react-router-dom";
import LoginForm from "./sign-up-login/LoginForm";
import { useState } from "react";
import SignUpForm from "./sign-up-login/SignUpForm";

const NavBar = () => {
  // Login modal window control
  const [showModal, setShowLogin] = useState({ login: false, singUp: false });
  const handleModalClose = (modalName) => {
    setShowLogin((prevValue) => ({ ...prevValue, [modalName]: false }));
  };
  const handleModalShow = (modalName) => {
    setShowLogin((prevValue) => ({ ...prevValue, [modalName]: true }));
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Andrew</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
              <Nav.Link as={NavLink} to={"about"}>
                About us
              </Nav.Link>
              <Nav.Link as={NavLink} to={"cart"}>
                Cart
              </Nav.Link>
              <Button
                variant="primary"
                onClick={() => handleModalShow("singUp")}
              >
                Sign in
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <LoginForm
        showInitial={showModal.login}
        handleClose={() => handleModalClose("login")}
      />
      <SignUpForm
        showInitial={showModal.singUp}
        handleClose={() => handleModalClose("singUp")}
      />
      <Outlet />
    </>
  );
};

export default NavBar;

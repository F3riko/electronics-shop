import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Container fluid className="ftr-wrapper">
      <Row className="ftr-link-wrapper">
        <Col md={4}>
          <h6 className="ftr-link">
            <Link className="ftr-link-text">About us</Link>
          </h6>
        </Col>
        <Col md={4}>
          <h6 className="ftr-link">
            <Link className="ftr-link-text">Products</Link>
          </h6>
        </Col>
        <Col md={4}>
          <h6 className="ftr-link">
            <Link className="ftr-link-text">Contact us</Link>
          </h6>
        </Col>
      </Row>
      <Row className="ftr-slogan">
        <Col>
          <p className="mb-0">
            Electroverse - Explore The World Of Tech Wonders!
          </p>
        </Col>
      </Row>
      <Row className="ftr-copyright">
        <Col>© 2023 Copyright: Andrew Milman</Col>
      </Row>
    </Container>
  );
};

export default Footer;

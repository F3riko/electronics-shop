import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CustomLink from "../../shared/CustomLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStore } from "@fortawesome/free-solid-svg-icons";

const NoProductsCardCart = () => {
  return (
    <Row className="justify-content-center align-items-center no-products-card-body">
      <Col className="text-center">
        <h3>Your cart is still empty! No products to review...</h3>
        <p style={{ fontSize: "20px" }}>Why wait? Add items now!</p>
        <CustomLink to={"/"}>
          <h3 className="font-weight-normal">Explore Electroverse!</h3>
          <FontAwesomeIcon
            icon={faStore}
            className="link-icon-black"
            size="2xl"
            style={{ color: "#000000" }}
          />
          <FontAwesomeIcon
            className="link-icon-blue"
            icon={faStore}
            size="2xl"
            style={{ color: "#0e59e2" }}
          />
        </CustomLink>
      </Col>
    </Row>
  );
};

export default NoProductsCardCart;

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faStore } from "@fortawesome/free-solid-svg-icons";

const AddressPlate = ({
  addressData,
  selected,
  handleSelect,
  delivery = false,
}) => {
  return (
    <Container
      className={
        selected ? "addrs-plate-wrapper-selected" : "addrs-plate-wrapper"
      }
      onClick={() => handleSelect(addressData.id)}
    >
      <Row>
        <Col xs={1}>
          <FontAwesomeIcon
            icon={delivery ? faTruck : faStore}
            className="addrs-plate-icon"
          />
        </Col>
        <Col>
          <Row>
            <Col>
              <h6>
                {delivery
                  ? "Delivery to the address"
                  : "Self pick up from the address"}
              </h6>
            </Col>
          </Row>

          {delivery && (
            <>
              <Row>
                <Col md={12} xl={6}>
                  <span className="addrs-plate-info-title">Name: </span>
                  {addressData.name}
                </Col>
                <Col md={12} xl={6}>
                  <span className="addrs-plate-info-title">Surname: </span>
                  {addressData.surname}
                </Col>
              </Row>
              <Row>
                <Col md={12} xl={6}>
                  <span className="addrs-plate-info-title">Email: </span>
                  {addressData.email}
                </Col>
                <Col md={12} xl={6}>
                  <span className="addrs-plate-info-title">Phone: </span>
                  {addressData.phone}
                </Col>
              </Row>
            </>
          )}
          <Row>
            {delivery && (
              <Col md={12} xl={6}>
                <span className="addrs-plate-info-title">Zip: </span>
                {addressData.zip}
              </Col>
            )}
            <Col md={12} xl={delivery ? 6 : 12}>
              <span className="addrs-plate-info-title">City: </span>
              {addressData.city}
            </Col>
          </Row>
          <Row>
            <Col>
              <span className="addrs-plate-info-title">Street: </span>
              {addressData.street}
            </Col>
          </Row>
          <Row>
            <Col>
              <span className="addrs-plate-info-title">Address: </span>
              {addressData.address}
            </Col>
          </Row>
          {delivery && addressData.additionalInfo && (
            <Row>
              <Col>
                <span className="addrs-plate-info-title">
                  Additional info:{" "}
                </span>
                <p>{addressData.additionalInfo}</p>
              </Col>
            </Row>
          )}
          {!delivery && (
            <Row>
              <Col>
                <span className="addrs-plate-info-title">Working hours: </span>
                {addressData.working_hours}
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AddressPlate;

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Figure from "react-bootstrap/Figure";
import { calculateDaysTillNow } from "../../../utils/orderOperations/formatDate";

const UserProfile = ({ data }) => {
  const daysRegistered = calculateDaysTillNow(data.registered_at);

  return (
    <Container style={{ width: "100%" }}>
      <Row>
        <Col
          xs={12}
          className="d-flex flex-column align-items-center justify-content-center"
        >
          <Figure>
            <Figure.Image
              src="/images/other/user.png"
              roundedCircle
              className="profile-placeholder-image"
            />
            <Figure.Caption className="text-center">
              <span className="profile-placeholder-image-caption">
                {data.name || data.email}
              </span>
            </Figure.Caption>
          </Figure>
          <p style={{ fontSize: "20px" }}>
            Your journey with Electroverse has been an amazing{" "}
            <span style={{ fontWeight: "bolder" }}>{daysRegistered} </span>
            days! Isn't that pretty awesome?
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;

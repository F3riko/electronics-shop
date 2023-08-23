import React, { useState, useEffect } from "react";
import { Container, Row, Col, Figure } from "react-bootstrap";
import Cookies from "js-cookie";

const UserPage = () => {
  //   const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const openDataCookie = Cookies.get("openData");
    if (openDataCookie) {
      const username = JSON.parse(Cookies.get("openData"));
      setUserName(username);
    }
    // setLoading(false)
  });

  return (
    <Container fluid>
      <Row>
        <Col md={3} xs={12} className="d-flex justify-content-center">
          <Figure>
            <Figure.Image
              src="/user.png"
              roundedCircle
              className="profile-placeholder-image"
            />
            <Figure.Caption className="text-center profile-placeholder-image-caption">
              {userName}
            </Figure.Caption>
          </Figure>
        </Col>
      </Row>
    </Container>
  );
};

export default UserPage;

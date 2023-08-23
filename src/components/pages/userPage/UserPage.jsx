import React, { useState, useEffect } from "react";
import { Container, Row, Col, Figure, Button } from "react-bootstrap";
import Cookies from "js-cookie";
// testing sessions
import axios from "axios";

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

  // Testing sessions
  const [counter, setCounter] = useState(0);

  const handleCounter = async (action) => {
    try {
      const response = await axios.post(
        `http://localhost:3100/api/auth/user/${action}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setCounter(response.data.counter);
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

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
        {/* Testing counters */}
        <Col>
          <Button
            className="mx-2"
            onClick={() => {
              handleCounter("increment");
            }}
          >
            +
          </Button>
          <span className="p-2">{counter}</span>
          <Button
            className="mx-2"
            onClick={() => {
              handleCounter("decrement");
            }}
          >
            -
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default UserPage;

import React from "react";
import { Container, Row, Col, Figure } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import useFetch from "../../../utils/useFetch";
import { getProfileInfo } from "../../../services/api/userProfile-api";

const UserPage = () => {
  const { data, loading, error } = useFetch(getProfileInfo);

  return (
    <Container fluid>
      {loading ? (
        <h6>Wait for page loading...</h6>
      ) : data && data.email ? (
        <Tabs
          defaultActiveKey="profile"
          id="justify-tab-example"
          className="mb-3"
          justify
        >
          <Tab eventKey="profile" title="Profile settings">
            <Row>
              <Col md={3} xs={12} className="d-flex justify-content-center">
                <Figure>
                  <Figure.Image
                    src="/user.png"
                    roundedCircle
                    className="profile-placeholder-image"
                  />
                  <Figure.Caption className="text-center profile-placeholder-image-caption">
                    {data.name || data.email}
                  </Figure.Caption>
                </Figure>
              </Col>
            </Row>
          </Tab>
          <Tab eventKey="wishlist" title="Liked items">
            In this tab you can see the items you liked
          </Tab>
          <Tab eventKey="orderhistory" title="Order history">
            In this tab you can monitor your order status and order history
          </Tab>
          <Tab eventKey="billing" title="Address and payments">
            In this tab you can manage your delivery address and payment methods
          </Tab>
        </Tabs>
      ) : (
        <h6>No user data available.</h6>
      )}
    </Container>
  );
};

export default UserPage;

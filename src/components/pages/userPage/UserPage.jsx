import React from "react";
import { Container, Row, Col, Figure } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import useFetch from "../../../utils/customHooks/useFetch";
import { getProfileInfo } from "../../../services/api/userApi/getUserInfoApi";
import LoadingSpinner from "../../shared/LoadingSpinner";
import NoDataError from "../../shared/NoDataError";
import { useAuth } from "../../../contextProviders/AuthProvider";
import { useNavigate } from "react-router-dom";
import UserWishList from "./UserWishList";

const UserPage = () => {
  const { data, loading, error } = useFetch(getProfileInfo);
  const { logout, wishList } = useAuth();
  const navigate = useNavigate();

  if (error) {
    setTimeout(() => {
      logout();
      navigate("/");
    }, 1000);
  }

  return (
    <Container fluid>
      {loading && <LoadingSpinner />}
      {error && <NoDataError />}
      {data && data.email && (
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
                    src="/images/other/user.png"
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
            <UserWishList />
          </Tab>
          <Tab eventKey="orderhistory" title="Order history">
            In this tab you can monitor your order status and order history
          </Tab>
          <Tab eventKey="billing" title="Address and payments">
            In this tab you can manage your delivery address and payment methods
          </Tab>
        </Tabs>
      )}
    </Container>
  );
};

export default UserPage;

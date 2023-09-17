import React from "react";
import Container from "react-bootstrap/Container";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import LoadingSpinner from "../../shared/LoadingSpinner";
import useFetch from "../../../utils/customHooks/useFetch";
import NoDataError from "../../shared/NoDataError";
import UserWishList from "./UserWishList";
import OrderHistory from "./OrderHistory";
import UserAddresses from "./UserAddresses";
import UserProfile from "./UserProfile";
import { getProfileInfo } from "../../../services/api/userApi/getUserInfoApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contextProviders/AuthProvider";

const UserPage = () => {
  const { data, loading, error } = useFetch(getProfileInfo);
  const { logout } = useAuth();
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
          <Tab eventKey="profile" title="My profile">
            <UserProfile data={data} />
          </Tab>
          <Tab eventKey="wishlist" title="Liked items">
            <UserWishList />
          </Tab>
          <Tab eventKey="orderhistory" title="Order history">
            <OrderHistory />
          </Tab>
          <Tab eventKey="addresses" title="Addresses">
            <UserAddresses />
          </Tab>
        </Tabs>
      )}
    </Container>
  );
};

export default UserPage;

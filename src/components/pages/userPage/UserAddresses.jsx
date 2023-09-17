import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AddressPlate from "../../shared/AddressPlate";
import DeliveryForm from "../../forms/usualForms/DeliveryForm";
import NoDataError from "../../shared/NoDataError";
import useFetch from "../../../utils/customHooks/useFetch";
import LoadingSpinner from "../../shared/LoadingSpinner";
import { nanoid } from "nanoid";
import { useState } from "react";
import { getUserAddresses } from "../../../services/api/userApi/getUserAddressesApi";
import { useAuth } from "../../../contextProviders/AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const UserAddresses = () => {
  const { user } = useAuth();
  const { data, error, loading, refetch } = useFetch(
    getUserAddresses,
    user?.id
  );
  const [showForm, setShowForm] = useState(false);

  return (
    <Container className="mx-5 px-5">
      <Row className="mx-5 px-5">
        <p className="mb-4 text-center" style={{ fontSize: "18px" }}>
          On this page, you can easily manage your addresses by reviewing,
          removing outdated ones, and adding new ones as needed!
        </p>
      </Row>
      {loading && <LoadingSpinner />}
      {error && <NoDataError />}
      {!loading && !error && data && (
        <Row className="mx-5 px-5">
          {data.map((address) => {
            return (
              <Col md={6} xs={12} key={nanoid()}>
                <AddressPlate
                  deletionAllowed={true}
                  refetch={refetch}
                  addressData={address}
                  handleSelect={() => {}}
                />
              </Col>
            );
          })}
          <Col
            md={6}
            xs={12}
            className="mb-3"
            onClick={() => setShowForm((prevValue) => !prevValue)}
          >
            <Container className="order-page-new-address-wrapper">
              <FontAwesomeIcon icon={faLocationDot} size="2xl" />
              <h5 className="text-center mt-2">
                {showForm ? "Hide new address form" : "Add new address"}
              </h5>
            </Container>
          </Col>
        </Row>
      )}
      {!loading && !error && showForm && (
        <Row className="mx-5 px-5">
          <Col>
            <DeliveryForm
              refetch={refetch}
              handleClose={() => setShowForm(false)}
            />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default UserAddresses;

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faStore, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteUserAddress } from "../../services/api/userApi/deleteUserAddress";
import { useAuth } from "../../contextProviders/AuthProvider";
import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { useNavigate } from "react-router-dom";

const AddressPlate = ({
  addressData,
  selected,
  deletionAllowed = false,
  handleSelect,
  delivery = true,
  refetch,
}) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [deleteFlow, setDeleteFlow] = useState({
    loading: false,
    error: false,
    confirmation: false,
  });

  const handleAddressDelete = async () => {
    setDeleteFlow((prevData) => ({ ...prevData, confirmation: true }));
  };

  const handleAddressDeleteConfirmed = async () => {
    try {
      setDeleteFlow((prevData) => ({
        ...prevData,
        confirmation: false,
        loading: true,
      }));
      await deleteUserAddress(user.id, addressData.id);
      refetch();
    } catch (error) {
      if (error?.response?.data.error === "Unauthorized: Token missing") {
        logout();
        navigate("/");
      } else {
        setDeleteFlow((prevData) => ({
          ...prevData,
          error: true,
        }));
      }
      setTimeout(() => {
        setDeleteFlow((prevData) => ({
          ...prevData,
          error: false,
        }));
      }, 3000);
    } finally {
      setDeleteFlow((prevData) => ({
        ...prevData,
        loading: false,
      }));
    }
  };

  return (
    <Container
      className={
        deleteFlow.confirmation || deleteFlow.error || deleteFlow.loading
          ? "addrs-plate-wrapper-delete"
          : selected
          ? "addrs-plate-wrapper-selected"
          : "addrs-plate-wrapper"
      }
      onClick={() => handleSelect(addressData.id)}
    >
      {deleteFlow.loading && <LoadingSpinner />}
      {deleteFlow.error && (
        <h3 className="text-center my-5 py-2">
          Oops... Something went wrong, try again later!
        </h3>
      )}
      {deleteFlow.confirmation && (
        <Row>
          <Col>
            <h3 className="text-center">
              Are you sure that you want to delete this address?
            </h3>
            <div className="d-flex justify-content-around mx-5 py-3">
              <Button
                variant="danger"
                onClick={handleAddressDeleteConfirmed}
                className="w-50 mx-5"
              >
                Yes
              </Button>
              <Button
                className="w-50 mx-5"
                variant="success"
                onClick={() =>
                  setDeleteFlow((prevData) => ({
                    ...prevData,
                    confirmation: false,
                  }))
                }
              >
                No
              </Button>
            </div>
          </Col>
        </Row>
      )}
      {!deleteFlow.error && !deleteFlow.loading && !deleteFlow.confirmation && (
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
                  <span className="addrs-plate-info-title">
                    Working hours:{" "}
                  </span>
                  {addressData.working_hours}
                </Col>
              </Row>
            )}
          </Col>
          {deletionAllowed && (
            <Col xs={1}>
              <FontAwesomeIcon
                icon={faTrash}
                className="addrs-plate-icon-trash"
                onClick={handleAddressDelete}
              />
            </Col>
          )}
        </Row>
      )}
    </Container>
  );
};

export default AddressPlate;

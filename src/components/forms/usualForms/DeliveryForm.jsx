import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Spinner from "react-bootstrap/Spinner";
import { defaultAddressData } from "../../../utils/validations/addressValidations";
import {
  handleBlur,
  handleChange,
  validateAllInput,
  renderErrors,
} from "../../../utils/validations/validationFunctions";
import { useState } from "react";
import { addUserAddress } from "../../../services/api/userApi/addUserAddress";
import { useAuth } from "../../../contextProviders/AuthProvider";
import ValidationErrorElement from "../../shared/ValidationError";

const DeliveryForm = ({ refetch, handleClose }) => {
  const [addressData, setAddressData] = useState(defaultAddressData);
  const [fetchStatus, setFetchStatus] = useState({
    loading: false,
    error: false,
  });
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const errors = validateAllInput(addressData, setAddressData);
      if (!errors) {
        setFetchStatus((prevData) => ({ ...prevData, loading: true }));
        const addressDataClean = {
          name: addressData.name.value,
          surname: addressData.surname.value,
          email: addressData.email.value,
          phone: addressData.phone.value,
          zip: addressData.zip.value,
          city: addressData.city.value,
          street: addressData.street.value,
          address: addressData.address.value,
          additionalInfo: addressData.additionalInfo.value,
        };
        await addUserAddress(user?.id, addressDataClean);
        refetch();
        handleClose();
      }
    } catch (error) {
      setAddressData(defaultAddressData);
      setFetchStatus((prevData) => ({ ...prevData, error: true }));
      setTimeout(() => {
        setFetchStatus((prevData) => ({ ...prevData, error: false }));
      }, 3000);
    } finally {
      setFetchStatus((prevData) => ({ ...prevData, loading: false }));
    }
  };

  return (
    <Container className="address-form-wrapper">
      <Form onSubmit={handleSubmit}>
        <Row>
          <h6 className="text-center mb-3">Recipient</h6>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <Form.Group controlId="name" className="address-form-field">
              <FloatingLabel controlId="name" label="First Name">
                <Form.Control
                  onChange={(e) => handleChange(e, setAddressData)}
                  onBlur={(e) => handleBlur(e, addressData, setAddressData)}
                  type="text"
                  placeholder="First Name"
                  required
                  value={addressData.name.value}
                />
                <Form.Text className="text-center">
                  {renderErrors("name", addressData)}
                </Form.Text>
              </FloatingLabel>
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group controlId="surname" className="address-form-field">
              <FloatingLabel controlId="surname" label="Last Name">
                <Form.Control
                  onBlur={(e) => handleBlur(e, addressData, setAddressData)}
                  onChange={(e) => handleChange(e, setAddressData)}
                  type="text"
                  placeholder="Last Name"
                  required
                  value={addressData.surname.value}
                />
                <Form.Text className="text-center">
                  {renderErrors("surname", addressData)}
                </Form.Text>
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <Form.Group controlId="phone" className="address-form-field">
              <FloatingLabel controlId="phone" label="Phone number">
                <Form.Control
                  onBlur={(e) => handleBlur(e, addressData, setAddressData)}
                  onChange={(e) => handleChange(e, setAddressData)}
                  type="digits"
                  placeholder="Phone number"
                  required
                  value={addressData.phone.value}
                />
                <Form.Text className="text-center">
                  {renderErrors("phone", addressData)}
                </Form.Text>
              </FloatingLabel>
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group controlId="email" className="address-form-field">
              <FloatingLabel controlId="email" label="Email">
                <Form.Control
                  onBlur={(e) => handleBlur(e, addressData, setAddressData)}
                  onChange={(e) => handleChange(e, setAddressData)}
                  type="text"
                  placeholder="Email"
                  required
                  value={addressData.email.value}
                />
                <Form.Text className="text-center">
                  {renderErrors("email", addressData)}
                </Form.Text>
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <h6 className="text-center my-3">Address</h6>
        </Row>
        <Row>
          <Col xs={12} md={4}>
            <Form.Group controlId="zip" className="address-form-field">
              <FloatingLabel controlId="zip" label="Zip code">
                <Form.Control
                  onBlur={(e) => handleBlur(e, addressData, setAddressData)}
                  onChange={(e) => handleChange(e, setAddressData)}
                  type="text"
                  placeholder="Zip code"
                  required
                  value={addressData.zip.value}
                />
                <Form.Text className="text-center">
                  {renderErrors("zip", addressData)}
                </Form.Text>
              </FloatingLabel>
            </Form.Group>
          </Col>
          <Col xs={12} md={4}>
            <Form.Group controlId="city" className="address-form-field">
              <FloatingLabel controlId="city" label="City">
                <Form.Control
                  onBlur={(e) => handleBlur(e, addressData, setAddressData)}
                  onChange={(e) => handleChange(e, setAddressData)}
                  type="text"
                  placeholder="City"
                  required
                  value={addressData.city.value}
                />
                <Form.Text className="text-center">
                  {renderErrors("city", addressData)}
                </Form.Text>
              </FloatingLabel>
            </Form.Group>
          </Col>
          <Col xs={12} md={4}>
            {" "}
            <Form.Group controlId="street" className="address-form-field">
              <FloatingLabel controlId="street" label="Street">
                <Form.Control
                  onBlur={(e) => handleBlur(e, addressData, setAddressData)}
                  onChange={(e) => handleChange(e, setAddressData)}
                  type="text"
                  placeholder="Street"
                  required
                  value={addressData.street.value}
                />
                <Form.Text className="text-center">
                  {renderErrors("street", addressData)}
                </Form.Text>
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="address" className="address-form-field">
              <FloatingLabel controlId="address" label="Address">
                <Form.Control
                  onBlur={(e) => handleBlur(e, addressData, setAddressData)}
                  onChange={(e) => handleChange(e, setAddressData)}
                  type="text"
                  placeholder="Address"
                  required
                  value={addressData.address.value}
                />
                <Form.Text className="text-center">
                  {renderErrors("address", addressData)}
                </Form.Text>
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <h6 className="text-center my-3">Additional information</h6>
        </Row>
        <Row>
          <Col>
            <Form.Group
              className="address-form-field"
              controlId="additionalInfo"
            >
              <Form.Control
                as="textarea"
                placeholder="Leave your comment for delivery here"
                className="address-form-textarea"
                value={addressData.additionalInfo.value}
                onBlur={(e) => handleBlur(e, addressData, setAddressData)}
                onChange={(e) => handleChange(e, setAddressData)}
              />
              <Form.Text className="text-center">
                {renderErrors("additionalInfo", addressData)}
                {fetchStatus.error && <ValidationErrorElement />}
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="address-form-field">
              <Button
                variant={fetchStatus.error ? "danger" : "primary"}
                type="submit"
                className="w-100 py-2 mt-2"
              >
                {fetchStatus.loading && <Spinner size="sm" />}
                {fetchStatus.error ? "Oops, try again later" : "Submit"}
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default DeliveryForm;

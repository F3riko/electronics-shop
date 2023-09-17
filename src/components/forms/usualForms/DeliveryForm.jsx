import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Spinner from "react-bootstrap/Spinner";
import { defaultAddressData } from "../../../utils/validations/addressValidations";
import { validateInput } from "../../../utils/validations/singUpValidations";
import { useState } from "react";
import { addUserAddress } from "../../../services/api/userApi/addUserAddress";
import { useAuth } from "../../../contextProviders/AuthProvider";

const DeliveryForm = ({ refetch, handleClose }) => {
  const [addressData, setAddressData] = useState(defaultAddressData);
  const [fetchStatus, setFetchStatus] = useState({
    loading: false,
    error: false,
  });
  const { user } = useAuth();

  const handleFieldChange = (event) => {
    const { id, value } = event.target;
    setAddressData((prevFormData) => ({
      ...prevFormData,
      [id]: { ...prevFormData[id], value: value, errors: [] },
    }));
  };

  const validateField = (fieldId) => {
    const errors = validateInput(fieldId, addressData);
    if (errors && errors[0]) {
      setAddressData((prevFormData) => ({
        ...prevFormData,
        [fieldId]: { ...prevFormData[fieldId], errors: errors },
      }));
    }
  };

  const handleFieldBlur = (event) => {
    const { id } = event.target;
    validateField(id);
  };

  const renderErrors = (formDataKey) => {
    let errors;
    if (addressData[formDataKey].errors) {
      errors = addressData[formDataKey].errors.map((error) => {
        return (
          <small key={error.slice(0, 2)}>
            {error}
            <br />
          </small>
        );
      });
    }
    return errors ? errors : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasErrors = false;

    for (const fieldId in addressData) {
      const fieldValue = addressData[fieldId].value;
      if (!fieldValue && fieldId !== "additionalInfo") {
        setAddressData((prevFormData) => ({
          ...prevFormData,
          [fieldId]: {
            ...prevFormData[fieldId],
            errors: ["Shouldn't be empty"],
          },
        }));
        hasErrors = true;
        break;
      }
      validateField(fieldId);
    }

    if (!hasErrors) {
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
      try {
        setFetchStatus((prevValue) => ({ ...prevValue, loading: true }));
        await addUserAddress(user?.id, addressDataClean);
        refetch();
        handleClose();
      } catch (error) {
        setFetchStatus((prevValue) => ({ ...prevValue, error: true }));
        setTimeout(() => {
          setFetchStatus((prevValue) => ({ ...prevValue, error: false }));
        }, 3000);
      } finally {
        setFetchStatus((prevValue) => ({ ...prevValue, loading: false }));
      }
    }
  };

  return (
    <Container className="address-form-wrapper">
      <Form onSubmit={handleSubmit}>
        <Row>
          <h6 className="text-center mb-3">Recipient</h6>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="name" className="address-form-field">
              <FloatingLabel controlId="name" label="First Name">
                <Form.Control
                  onChange={handleFieldChange}
                  onBlur={handleFieldBlur}
                  type="text"
                  placeholder="First Name"
                  required
                  defaultValue={addressData.name.value}
                />
                <Form.Text className="text-center">
                  {renderErrors("name")}
                </Form.Text>
              </FloatingLabel>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="surname" className="address-form-field">
              <FloatingLabel controlId="surname" label="Last Name">
                <Form.Control
                  onBlur={handleFieldBlur}
                  onChange={handleFieldChange}
                  type="text"
                  placeholder="Last Name"
                  required
                  defaultValue={addressData.surname.value}
                />
                <Form.Text className="text-center">
                  {renderErrors("surname")}
                </Form.Text>
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="phone" className="address-form-field">
              <FloatingLabel controlId="phone" label="Phone number">
                <Form.Control
                  onBlur={handleFieldBlur}
                  onChange={handleFieldChange}
                  type="digits"
                  placeholder="Phone number"
                  required
                  defaultValue={addressData.phone.value}
                />
                <Form.Text className="text-center">
                  {renderErrors("phone")}
                </Form.Text>
              </FloatingLabel>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="email" className="address-form-field">
              <FloatingLabel controlId="email" label="Email">
                <Form.Control
                  onBlur={handleFieldBlur}
                  onChange={handleFieldChange}
                  type="text"
                  placeholder="Email"
                  required
                  defaultValue={addressData.email.value}
                />
                <Form.Text className="text-center">
                  {renderErrors("email")}
                </Form.Text>
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <h6 className="text-center my-3">Address</h6>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="zip" className="address-form-field">
              <FloatingLabel controlId="zip" label="Zip code">
                <Form.Control
                  onBlur={handleFieldBlur}
                  onChange={handleFieldChange}
                  type="text"
                  placeholder="Zip code"
                  required
                  defaultValue={addressData.zip.value}
                />
                <Form.Text className="text-center">
                  {renderErrors("zip")}
                </Form.Text>
              </FloatingLabel>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="city" className="address-form-field">
              <FloatingLabel controlId="city" label="City">
                <Form.Control
                  onBlur={handleFieldBlur}
                  onChange={handleFieldChange}
                  type="text"
                  placeholder="City"
                  required
                  defaultValue={addressData.city.value}
                />
                <Form.Text className="text-center">
                  {renderErrors("city")}
                </Form.Text>
              </FloatingLabel>
            </Form.Group>
          </Col>
          <Col>
            {" "}
            <Form.Group controlId="street" className="address-form-field">
              <FloatingLabel controlId="street" label="Street">
                <Form.Control
                  onBlur={handleFieldBlur}
                  onChange={handleFieldChange}
                  type="text"
                  placeholder="Street"
                  required
                  defaultValue={addressData.street.value}
                />
                <Form.Text className="text-center">
                  {renderErrors("street")}
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
                  onBlur={handleFieldBlur}
                  onChange={handleFieldChange}
                  type="text"
                  placeholder="Address"
                  required
                  defaultValue={addressData.address.value}
                />
                <Form.Text className="text-center">
                  {renderErrors("address")}
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
                defaultValue={addressData.additionalInfo.value}
                onBlur={handleFieldBlur}
                onChange={handleFieldChange}
              />
              <Form.Text className="text-center">
                {renderErrors("additionalInfo")}
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

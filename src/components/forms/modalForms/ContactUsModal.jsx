import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import "bootstrap/dist/css/bootstrap.min.css";
import { defaultContactUsData } from "../../../utils/validations/contactUsValidations";
import {
  handleChange,
  handleBlur,
  validateAllInput,
  renderErrors,
} from "../../../utils/validations/validationFunctions";
import ValidationErrorElement from "../../shared/ValidationError";
import Spinner from "react-bootstrap/Spinner";

function ContactUsForm({ showInitial, handleClose }) {
  const [contactUsData, setContactUsData] = useState(defaultContactUsData);
  const [fetchStatus, setFetchStatus] = useState({
    loading: false,
    error: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let errors = validateAllInput(contactUsData, setContactUsData);
      if (!errors) {
        setFetchStatus((prevData) => ({ ...prevData, loading: true }));
        const inquiryData = {
          name: contactUsData.name.value,
          email: contactUsData.email.value,
          inquiry: contactUsData.inquiry.value,
        };
        console.log(inquiryData);
      }
    } catch (error) {
      setFetchStatus((prevData) => ({ ...prevData, error: true }));
      setTimeout(() => {
        setFetchStatus((prevData) => ({ ...prevData, error: false }));
      }, 3000);
    } finally {
      setFetchStatus((prevData) => ({ ...prevData, loading: false }));
    }
  };

  return (
    <Modal show={showInitial} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Contact Us</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <FloatingLabel controlId="name" label="Name" className="mb-3">
              <Form.Control
                onChange={(e) => handleChange(e, setContactUsData)}
                onBlur={(e) => handleBlur(e, contactUsData, setContactUsData)}
                type="text"
                placeholder="Name"
                defaultValue={contactUsData.name.value}
                required
              />
              <Form.Text className="text-center">
                {renderErrors("name", contactUsData)}
              </Form.Text>
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <FloatingLabel controlId="email" label="Email">
              <Form.Control
                onChange={(e) => handleChange(e, setContactUsData)}
                onBlur={(e) => handleBlur(e, contactUsData, setContactUsData)}
                type="email"
                placeholder={"Email"}
                value={contactUsData.email.value}
                required
              />
              <Form.Text className="text-center">
                {renderErrors("email", contactUsData)}
              </Form.Text>
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="inquiry">
            <FloatingLabel controlId="inquiry" label="Request">
              <Form.Control
                style={{ height: "200px" }}
                as="textarea"
                onChange={(e) => handleChange(e, setContactUsData)}
                onBlur={(e) => handleBlur(e, contactUsData, setContactUsData)}
                placeholder="Request"
                value={contactUsData.inquiry.value}
                required
              />
              <Form.Text className="text-center">
                {renderErrors("inquiry", contactUsData)}
                {fetchStatus.error && (
                  <ValidationErrorElement
                    error={
                      "Sorry, this service is temporary unavailable, try again later"
                    }
                  />
                )}
              </Form.Text>
            </FloatingLabel>
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 py-3">
            {fetchStatus.loading ? (
              <Spinner animation="border" variant="light" />
            ) : (
              "Submit"
            )}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ContactUsForm;

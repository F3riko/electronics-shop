import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import "bootstrap/dist/css/bootstrap.min.css";
import { validateInput } from "../../../utils/validations/singUpValidations";
import { defaultContactUsData } from "../../../utils/validations/contactUsValidations";
import { nanoid } from "nanoid";
import { useAuth } from "../../../contextProviders/AuthProvider";

function ContactUsForm({ showInitial, handleClose }) {
  const { user } = useAuth();
  const [contactUsData, setcontactUsData] = useState(defaultContactUsData);

  useEffect(() => {
    if (user?.email) {
      setcontactUsData({
        ...defaultContactUsData,
        email: { ...defaultContactUsData.email, value: user.email },
      });
    } else {
      setcontactUsData(defaultContactUsData);
    }
  }, [showInitial]);

  const handleFieldChange = (event) => {
    const { id, value } = event.target;
    setcontactUsData((prevFormData) => ({
      ...prevFormData,
      [id]: { ...prevFormData[id], value: value, errors: [] },
    }));
  };

  const validateField = (fieldId) => {
    const errors = validateInput(fieldId, contactUsData);
    if (errors && errors[0]) {
      setcontactUsData((prevFormData) => ({
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
    if (contactUsData[formDataKey].errors) {
      errors = contactUsData[formDataKey].errors.map((error) => {
        return (
          <small key={nanoid()}>
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

    for (const fieldId in contactUsData) {
      const fieldValue = contactUsData[fieldId].value;
      if (!fieldValue) {
        setcontactUsData((prevFormData) => ({
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
      const inquiryData = {
        name: contactUsData.name.value,
        email: contactUsData.email.value,
        inquiry: contactUsData.inquiry.value,
      };
      console.log(inquiryData);
    }
  };

  return (
    <Modal show={showInitial} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Contact Us</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group className="mb-3" controlId="name">
            <FloatingLabel controlId="name" label="Name" className="mb-3">
              <Form.Control
                onChange={handleFieldChange}
                onBlur={handleFieldBlur}
                type="text"
                placeholder="Name"
                defaultValue={contactUsData.name.value}
              />
              <Form.Text className="text-center">
                {renderErrors("name")}
              </Form.Text>
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <FloatingLabel controlId="email" label="Email">
              <Form.Control
                onChange={handleFieldChange}
                onBlur={handleFieldBlur}
                type="email"
                placeholder={"Email"}
                defaultValue={contactUsData.email.value}
              />
              <Form.Text className="text-center">
                {renderErrors("email")}
              </Form.Text>
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="inquiry">
            <FloatingLabel controlId="inquiry" label="Request">
              <Form.Control
                style={{ height: "200px" }}
                as="textarea"
                onChange={handleFieldChange}
                onBlur={handleFieldBlur}
                placeholder="Request"
                defaultValue={contactUsData.inquiry.value}
              />
              <Form.Text className="text-center">
                {renderErrors("inquiry")}
              </Form.Text>
            </FloatingLabel>
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 py-3">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ContactUsForm;

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
// import { useState } from "react";

const DeliveryForm = () => {
  // If there's user's data -> get it here
  // const [deliveryFormData, setDeliveryFormData] = useState({});

  return (
    <Container className="address-form-wrapper">
      <Row>
        <Col className="d-flex justify-content-between">
          <p>Delivery</p>
          <BootstrapSwitchButton
            onlabel="Delivery"
            offlabel="Pickup"
            checked={false}
            width={100}
          />
        </Col>
      </Row>
      <Row>
        <Form>
          <Row>
            <p className="text-center">Recipient</p>
          </Row>
          <Row>
            <Col>
              {" "}
              <Form.Group controlId="name">
                <FloatingLabel controlId="name" label="Name">
                  <Form.Control
                    // onChange={handleChange}
                    type="text"
                    placeholder="Name"
                    required
                    // defaultValue={loginData.email}
                  />
                </FloatingLabel>
              </Form.Group>
            </Col>
            <Col>
              {" "}
              <Form.Group controlId="name">
                <FloatingLabel controlId="name" label="Name">
                  <Form.Control
                    // onChange={handleChange}
                    type="text"
                    placeholder="Name"
                    required
                    // defaultValue={loginData.email}
                  />
                </FloatingLabel>
              </Form.Group>
            </Col>
            <Col>
              {" "}
              <Form.Group controlId="name">
                <FloatingLabel controlId="name" label="Name">
                  <Form.Control
                    // onChange={handleChange}
                    type="text"
                    placeholder="Name"
                    required
                    // defaultValue={loginData.email}
                  />
                </FloatingLabel>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <p className="text-center">Address</p>
          </Row>
          <Row>
            <Col>
              {" "}
              <Form.Group controlId="name">
                <FloatingLabel controlId="name" label="Name">
                  <Form.Control
                    // onChange={handleChange}
                    type="text"
                    placeholder="Name"
                    required
                    // defaultValue={loginData.email}
                  />
                </FloatingLabel>
              </Form.Group>
            </Col>
            <Col>
              {" "}
              <Form.Group controlId="name">
                <FloatingLabel controlId="name" label="Name">
                  <Form.Control
                    // onChange={handleChange}
                    type="text"
                    placeholder="Name"
                    required
                    // defaultValue={loginData.email}
                  />
                </FloatingLabel>
              </Form.Group>
            </Col>
            <Col>
              {" "}
              <Form.Group controlId="name">
                <FloatingLabel controlId="name" label="Name">
                  <Form.Control
                    // onChange={handleChange}
                    type="text"
                    placeholder="Name"
                    required
                    // defaultValue={loginData.email}
                  />
                </FloatingLabel>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              {" "}
              <Form.Group controlId="name">
                <FloatingLabel controlId="name" label="Name">
                  <Form.Control
                    // onChange={handleChange}
                    type="text"
                    placeholder="Name"
                    required
                    // defaultValue={loginData.email}
                  />
                </FloatingLabel>
              </Form.Group>
            </Col>
            <Col>
              {" "}
              <Form.Group controlId="name">
                <FloatingLabel controlId="name" label="Name">
                  <Form.Control
                    // onChange={handleChange}
                    type="text"
                    placeholder="Name"
                    required
                    // defaultValue={loginData.email}
                  />
                </FloatingLabel>
              </Form.Group>
            </Col>
            <Col>
              {" "}
              <Form.Group controlId="name">
                <FloatingLabel controlId="name" label="Name">
                  <Form.Control
                    // onChange={handleChange}
                    type="text"
                    placeholder="Name"
                    required
                    // defaultValue={loginData.email}
                  />
                </FloatingLabel>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <p className="text-center">Additional information</p>
          </Row>
          <Row>
            <Form.Control
              as="textarea"
              placeholder="Leave your comment for delivery here"
              style={{ height: "50%" }}
              className="address-form-textarea"
            />
          </Row>
        </Form>
      </Row>
    </Container>
  );
};

export default DeliveryForm;

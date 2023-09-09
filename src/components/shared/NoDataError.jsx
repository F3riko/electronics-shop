import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";

const NoDataError = () => {
  return (
    <Container>
      <Row className="data-error-wrapper">
        <Col className="data-error-inner-wrapper">
          <h4 className="data-error-header">
            Oops, something went wrong in our Electroverse universe!
          </h4>
          <p className="data-error-msg">
            We apologize, but we couldn't retrieve the data you requested at the
            moment. This could be due to a temporary issue on our end or a
            problem with your internet connection.
          </p>
          <p className="data-error-msg bolder">
            Here are a few steps you can try to resolve the issue:
          </p>
          <ol className="data-error-msg">
            <li className="data-error-li">
              Check your internet connection and make sure you're connected to
              the internet.
            </li>
            <li className="data-error-li">
              Refresh the page or try again later, as the problem may be
              temporary.
            </li>
            <li className="data-error-li">
              If the issue persists, please contact our support team at{" "}
              <span className="bolder">support@electroverse.com</span> for
              further assistance.
            </li>
          </ol>
          <p className="data-error-msg">
            We appreciate your understanding and patience as we work to resolve
            this issue. Thank you for using our service!
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default NoDataError;

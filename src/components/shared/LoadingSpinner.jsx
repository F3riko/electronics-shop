import Container from "react-bootstrap/esm/Container";
import Spinner from "react-bootstrap/esm/Spinner";

const LoadingSpinner = () => {
  return (
    <Container className="d-flex justify-content-center my-5">
      <Spinner
        animation="border"
        role="status"
        variant="primary"
        className="my-5"
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Container>
  );
};

export default LoadingSpinner;

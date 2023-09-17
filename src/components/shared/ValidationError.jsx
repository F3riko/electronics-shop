import Alert from "react-bootstrap/Alert";

const ValidationErrorElement = ({ message }) => {
  return (
    <Alert variant="danger" className="login-modal-error-alert">
      {message || "Something went wrong! Try again later"}
    </Alert>
  );
};

export default ValidationErrorElement;

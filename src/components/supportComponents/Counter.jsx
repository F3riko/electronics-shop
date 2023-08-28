import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const Counter = ({ handleCounter, cartState }) => {
  return (
    <div className="d-flex justify-content-between align-items-center mb-2">
      <Button
        className="ms-3"
        variant="light"
        style={{ backgroundColor: "#ebf7ff" }}
        onClick={() => {
          handleCounter("-");
        }}
      >
        <FontAwesomeIcon icon={faMinus} style={{ color: "#1969ff" }} />
      </Button>
      <span className="cart-quantity-text">{cartState}</span>
      <Button
        className="me-3"
        variant="light"
        style={{ backgroundColor: "#ebf7ff" }}
        onClick={() => {
          handleCounter("+");
        }}
      >
        <FontAwesomeIcon icon={faPlus} style={{ color: "#1969ff" }} />
      </Button>
    </div>
  );
};

export default Counter;

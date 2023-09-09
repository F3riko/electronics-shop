import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
import { useRef, useState } from "react";

const Counter = ({ handleCounter, cartState, itemId, error }) => {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  const handleCounterInner = async (itemId, action) => {
    if (!show) setShow(false);
    await handleCounter(itemId, action);
    if (error) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 2000);
    }
  };

  return (
    <>
      <div
        className="d-flex justify-content-between align-items-center mb-2"
        ref={target}
      >
        <Button
          className="ms-3"
          variant="light"
          style={{ backgroundColor: "#ebf7ff" }}
          onClick={() => {
            handleCounterInner(itemId, "decr");
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
            handleCounterInner(itemId, "incr");
          }}
        >
          <FontAwesomeIcon icon={faPlus} style={{ color: "#1969ff" }} />
        </Button>
      </div>
      <Overlay target={target.current} show={show} placement="top">
        <Tooltip id="overlay-example">Oops, something went wrong!</Tooltip>
      </Overlay>
    </>
  );
};

export default Counter;

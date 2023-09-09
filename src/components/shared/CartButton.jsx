import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
import { useRef, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../contextProviders/AuthProvider";

const CartButton = ({ id }) => {
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const { fetchStatus, handleCart } = useAuth();

  const handleCartInner = async () => {
    if (!show) setShow(false);
    await handleCart(id, "incr");
    if (fetchStatus.cartCounterError) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 2000);
    }
  };

  return (
    <>
      <Button
        ref={target}
        variant="primary"
        className="mb-2"
        onClick={handleCartInner}
      >
        <FontAwesomeIcon icon={faCartShopping} />
        <span className="cart-text ms-1">Cart</span>
      </Button>
      <Overlay target={target.current} show={show} placement="top">
        <Tooltip id="overlay-example">Oops, something went wrong!</Tooltip>
      </Overlay>
    </>
  );
};

export default CartButton;

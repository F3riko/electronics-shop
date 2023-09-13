import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import ProductPreviewCardCart from "./ProductPreviewCardCart";
import CheckoutPlate from "../../shared/CheckoutPlate";
import { useAuth } from "../../../contextProviders/AuthProvider";
import { useNavigate } from "react-router-dom";
import prepareCartForOrder from "../../../utils/cartOperations/cartOp";
import { createOrder } from "../../../services/api/orderApi/createNewOderApi";
import NoProductsCardCart from "./NoProductsCardCart";
import { useState } from "react";
import ReceiptModal from "../../shared/ReceiptModal";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, handleSelectAll, updateCartFromServer } = useAuth();
  const [fetchState, setFetchState] = useState({
    newOrderLoading: false,
    newOrderError: false,
  });
  const [receipt, setReceipt] = useState({ show: false, id: null });

  const handleCloseReceipt = () => {
    setReceipt((prevValue) => ({ ...prevValue, show: false }));
    navigate("/");
  };

  const handleNewOrder = async () => {
    try {
      setFetchState((prevValue) => ({ ...prevValue, newOrderLoading: true }));
      const orderDataCart = await prepareCartForOrder(
        cart,
        updateCartFromServer
      );
      const orderId = await createOrder(orderDataCart);
      if (orderId) {
        setReceipt({ show: true, id: orderId });
      } else {
        throw new Error("Order id was't received from the server");
      }
    } catch (error) {
      setFetchState((prevValue) => ({ ...prevValue, newOrderError: true }));
    } finally {
      setFetchState((prevValue) => ({ ...prevValue, newOrderLoading: false }));
    }
  };

  return (
    <>
      <Container className="mt-3 cart-wrapper" fluid>
        {Object.values(cart.items).length !== 0 ? (
          <>
            <Row>
              <h3 className="text-center">Your cart</h3>
            </Row>
            <Row>
              <Col xs={12} md={8}>
                <Row>
                  <Col className="cart-select-all-wrapper">
                    <Form.Check type="checkbox" id="all">
                      <Form.Check.Input
                        type="checkbox"
                        className="cart-custom-check-box-all"
                        checked={
                          cart.itemsSelectedQuantity === cart.itemsQuantity
                        }
                        onChange={handleSelectAll}
                      />
                    </Form.Check>
                    <span className="ps-3">Select all</span>
                  </Col>
                  {Object.values(cart.items).map((item) => {
                    return (
                      <ProductPreviewCardCart itemId={item.id} key={item.id} />
                    );
                  })}
                </Row>
              </Col>

              <Col xs={12} md={4}>
                <CheckoutPlate
                  clickHandler={handleNewOrder}
                  loadingHandler={fetchState.newOrderError}
                />
              </Col>
            </Row>
          </>
        ) : (
          <NoProductsCardCart />
        )}
      </Container>
      <ReceiptModal
        handleClose={handleCloseReceipt}
        orderId={receipt.id}
        showInitial={receipt.show}
      />
    </>
  );
};

export default Cart;

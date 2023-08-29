import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import ProductPreviewCardCart from "./ProductPreviewCardCart";
import CheckoutPlate from "../../supportComponents/CheckoutPlate";
import { useAuth } from "../../supportComponents/AuthProvider";
import { useEffect, useState } from "react";

const Cart = () => {
  const sample = {
    id: 1,
    title: "Sony Xperia L4",
    category: 2,
    price: 199,
    year_of_production: 2020,
  };

  const { cart } = useAuth();
  const [selectedProducts, setSelectedProducts] = useState([]);

  const getSelectedAll = (cart) => {
    const selected = [];
    for (const item of Object.values(cart.items)) {
      selected.push(item.id);
    }
    return selected;
  };

  useEffect(() => {
    if (cart.itemsQuantity !== 0) {
      const selected = getSelectedAll(cart);
      setSelectedProducts(selected);
    } 
  }, []);

  const handleSelect = (id) => {
    setSelectedProducts((prevValue) => {
      if (prevValue.includes(id)) {
        return prevValue.filter((productId) => productId !== id);
      } else {
        return [...prevValue, id];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedProducts.length > 0) {
      setSelectedProducts([]);
    } else {
      const selected = getSelectedAll(cart);
      setSelectedProducts(selected);
    }
  };

  return (
    <Container className="mt-3 cart-wrapper" fluid>
      {cart.itemsQuantity !== 0 ? (
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
                      checked={selectedProducts.length > 0}
                      onChange={handleSelectAll}
                    />
                  </Form.Check>
                  <span className="ps-3">Select all</span>
                </Col>
                <ProductPreviewCardCart
                  productData={sample}
                  selected={selectedProducts.includes(sample.id)}
                  handleSelect={handleSelect}
                />
              </Row>
            </Col>

            <Col xs={12} md={4}>
              <CheckoutPlate cart={cart} selected={selectedProducts} />
            </Col>
          </Row>
        </>
      ) : (
        <h3>No items yet</h3>
      )}
    </Container>
  );
};

export default Cart;

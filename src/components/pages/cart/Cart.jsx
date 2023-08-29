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

  useEffect(() => {
    if (cart.itemsQuantity !== 0) {
      const selected = [];
      for (const item of Object.values(cart.items)) {
        selected.push(item.id);
      }
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

  return (
    <Container className="mt-3" fluid>
      {cart.itemsQuantity !== 0 ? (
        <>
          <Row>
            <h3 className="text-center">Your cart</h3>
          </Row>
          <Row>
            <Col xs={12} md={8}>
              <Row>
                <p>Select all</p>
                <Form.Check.Input
                  type="checkbox"
                  className="cart-custom-check-box"
                />
              </Row>
              <Row>
                <ProductPreviewCardCart
                  productData={sample}
                  selected={selectedProducts.includes(sample.id)}
                  handleSelect={handleSelect}
                />
                {/* <ProductPreviewCardCart
              productData={dummyData["LkxpsH1QWbtBjeyuJcN60"]}
            />
            <ProductPreviewCardCart
              productData={dummyData["LkxpsH1QWbtBjeyuJcN60"]}
            /> */}
              </Row>
            </Col>

            <Col xs={12} md={4}>
              <CheckoutPlate />
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

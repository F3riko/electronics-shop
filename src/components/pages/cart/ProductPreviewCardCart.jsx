import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import CustomLink from "../../supportComponents/CustomLink";
import Form from "react-bootstrap/Form";
import { useAuth } from "../../supportComponents/AuthProvider";
import Counter from "../../supportComponents/Counter";

const ProductPreviewCardCart = ({ productData }) => {
  const { cart, handleCart } = useAuth();

  return (
    <Container fluid className="bg-light">
      <Counter
        handleCounter={handleCart}
        cartState={cart.items[productData.id].quantity}
        itemId={productData.id}
      />
      <Row>
        <CustomLink to={`/product/${productData.id}`}>
          <p className="text-center mb-2">{productData.name}</p>
        </CustomLink>
      </Row>

      <Row>
        <Col md={1} xs={1} className="d-flex align-items-center px-0">
          <Form.Check
            type="checkbox"
            id="custom-checkbox"
            className="d-flex align-items-center justify-content-center"
          >
            <Form.Check.Input
              type="checkbox"
              className="cart-custom-check-box"
            />
          </Form.Check>
        </Col>

        <Col md={3} xs={6}>
          <Link to={`/product/${productData.id}`}>
            <Image
              src="/placeholder1.png"
              className="product-tile-thubmnail mt-0"
            />
          </Link>
        </Col>

        <Col md={4} xs={5} className="mx-2">
          <span>Weight: {productData.weight}g</span>
        </Col>

        <Col className="d-flex flex-column">
          <Button variant="info" className="mt-2">
            {productData.price}$
          </Button>

          <Button variant="primary" className="mb-2">
            <FontAwesomeIcon icon={faHeart} />
            Whishlist
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductPreviewCardCart;

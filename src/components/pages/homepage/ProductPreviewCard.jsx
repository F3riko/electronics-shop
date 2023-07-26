import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

import categories from "../../dummydata/categories";

const ProductPreviewCard = ({ productData }) => {
  return (
    <Container fluid className="bg-light">
      <Row>
        <Col className="text-center">{productData.name}</Col>
      </Row>
      <Row>
        <Col xs={3} className="product-tile-thubmnail-wrapper">
          <Image src="/placeholder1.png" className="product-tile-thubmnail" />
        </Col>
        <Col className="d-flex flex-column justify-content-between">
          <Row>
            <span>
              Category: {categories[productData.category].category_name}
            </span>
            <span>Description: {productData.short_description}</span>
            <span>Year of production: {productData.year_of_production}</span>
            <span>Weight: {productData.weight}g</span>
            <span>In stock: {productData.stock_quantity}</span>
          </Row>
          <Row className="justify-content-start">
            <Col xs={3} className="d-inline-flex product-tile-button-wrapper">
              <Button variant="secondary" className="w-100 m-2">
                <FontAwesomeIcon icon={faStar} />
                <Badge bg="secondary">9</Badge>
                <span className="visually-hidden">Product rating</span>
              </Button>
            </Col>
            <Col xs={3} className="d-inline-flex product-tile-button-wrapper">
              <Button variant="secondary" className="w-100 m-2">
                <FontAwesomeIcon icon={faComment} />
                <Badge bg="secondary">9</Badge>
                <span className="visually-hidden">Comments</span>
              </Button>
            </Col>
          </Row>
        </Col>
        <Col xs={2} className="d-flex flex-column">
          <Button variant="info" className="mb-auto mt-2">
            {productData.price}$
          </Button>
          <Button variant="primary" className="mb-2">
            <FontAwesomeIcon icon={faCartShopping} />
            Cart
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

export default ProductPreviewCard;

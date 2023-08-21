import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";

// Dummy data
import dummyData from "../../dummydata/electronicsData";
import CartBlock from "./productPageCartBlock/CartBlock";

const ProductPage = () => {
  const { productId } = useParams();

  const [product, setProduct] = useState({});

  useEffect(() => {
    setProduct(dummyData[productId]);
  }, [productId]);

  return (
    <Container fluid>
      <Row>
        <h3 className="text-center">{product.name}</h3>
      </Row>
      <Row>
        <Col xs={12} md={4}>
          <Image src="/placeholder1.png" className="product-tile-thubmnail" />
        </Col>
        <Col xs={12} md={4}>
          {/* <span>Category: {categories[product.category].category_name}</span> */}
          <span>Description: {product.short_description}</span>
          <span>Year of production: {product.year_of_production}</span>
          <span>Weight: {product.weight}g</span>
          <span>In stock: {product.stock_quantity}</span>
        </Col>
        <Col xs={12} md={4}>
          <CartBlock price={product.price} discount={"200"} />
        </Col>
      </Row>
    </Container>
  );
};

export default ProductPage;

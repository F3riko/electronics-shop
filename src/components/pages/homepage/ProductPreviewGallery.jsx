import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import ProductPreviewCard from "./ProductPreviewCard";

const ProductPreviewGallery = ({ productsData }) => {
  return (
    <Container>
      {productsData.map((card) => {
        return (
          <Row className="mb-2">
            <ProductPreviewCard />
          </Row>
        );
      })}
    </Container>
  );
};

export default ProductPreviewGallery;

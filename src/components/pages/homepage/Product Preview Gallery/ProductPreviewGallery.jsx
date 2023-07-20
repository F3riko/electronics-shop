import { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import ProductPreviewCard from "../ProductPreviewCard";
import GalleryPagination from "./GalleryPagination";

const ProductPreviewGallery = ({ productsData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setTotalPages(Math.ceil(productsData.length / 24));
  }, [productsData]);

  return (
    <Container>
      {productsData
        .slice(24 * (currentPage - 1), 24 * currentPage)
        .map((card) => {
          return (
            <Row className="mb-2" key={card.id}>
              <ProductPreviewCard data={card} />
            </Row>
          );
        })}
      <Row>
        <GalleryPagination
          currentPage={currentPage}
          pagesTotal={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </Row>
    </Container>
  );
};

export default ProductPreviewGallery;

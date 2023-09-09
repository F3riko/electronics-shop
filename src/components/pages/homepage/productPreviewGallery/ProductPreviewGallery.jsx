import { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import ProductPreviewCard from "./ProductPreviewCard";
import GalleryPagination from "./GalleryPagination";
import NoProductsCard from "./NoProductsCard";
import LoadingSinner from "../../../shared/LoadingSpinner";

const ProductPreviewGallery = ({ productsData, loading }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (productsData) {
      setTotalPages(Math.ceil(productsData.length / 24));
    }
  }, [productsData]);

  const ProductsToRender = () => {
    if (productsData && productsData.length > 0) {
      return (
        <>
          {productsData
            .slice(24 * (currentPage - 1), 24 * currentPage)
            .map((card) => {
              return (
                <Row className="mb-2" key={card.id}>
                  <ProductPreviewCard productData={card} />
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
        </>
      );
    }
  };

  return (
    <Container>
      {loading && <LoadingSinner />}
      {productsData.length === 0 && !loading ? (
        <NoProductsCard />
      ) : (
        <ProductsToRender />
      )}
    </Container>
  );
};

export default ProductPreviewGallery;

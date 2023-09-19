import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Carousel from "react-bootstrap/Carousel";
import CartBlock from "./CartBlock";
import NoDataError from "../../shared/NoDataError";
import LoadingSpinner from "../../shared/LoadingSpinner";
import ThumbnailRender from "../../shared/ThumbnailRender";
import ReviewGallery from "./Reviews/ReviewGallery";
import RatingComponent from "../../shared/RatingElement";
import { getProduct } from "../../../services/api/productApi/getProductApi";
import { getProductImg } from "../../../services/api/productApi/getProductImgApi";
import useFetch from "../../../utils/customHooks/useFetch";
import { useAuth } from "../../../contextProviders/AuthProvider";

const ProductPage = () => {
  const { productId } = useParams();
  const {
    data: productData,
    loading: productLoading,
    error: productError,
    refetch,
  } = useFetch(getProduct, productId);

  const {
    data: imgData,
    loading: imgLoading,
    error: imgError,
  } = useFetch(getProductImg, productId);
  const { categories } = useAuth();
  const { cart } = useAuth();

  return (
    <Container className="pr-page-wrapper">
      {productError && <NoDataError />}
      {productLoading && <LoadingSpinner />}
      {productData && (
        <>
          <Row>
            <h4 className="text-center mt-3">{productData.title}</h4>
          </Row>
          <Row>
            <Col xs={12} md={3} className="pr-page-gallery-wrapper">
              <Carousel fade variant="dark">
                <Carousel.Item className="text-center">
                  <div className="pr-page-carousel-item">
                    <ThumbnailRender
                      data={imgData}
                      loading={imgLoading}
                      error={imgError}
                    />
                  </div>
                </Carousel.Item>
                <Carousel.Item className="text-center">
                  <div className="pr-page-carousel-item">
                    <ThumbnailRender
                      data={imgData}
                      loading={imgLoading}
                      error={imgError}
                    />
                  </div>
                </Carousel.Item>
                <Carousel.Item className="text-center">
                  <div className="pr-page-carousel-item">
                    <ThumbnailRender
                      data={imgData}
                      loading={imgLoading}
                      error={imgError}
                    />
                  </div>
                </Carousel.Item>
              </Carousel>
            </Col>
            <Col
              xs={12}
              md={5}
              className="pr-page-short-specs d-flex flex-column"
            >
              <span className="mb-2">
                {" "}
                <RatingComponent
                  initialValue={
                    productData.item_rating / productData.reviews_quantity
                  }
                  size={"lg"}
                />
                <span className="ms-1">({productData.reviews_quantity})</span>
              </span>
              {categories && categories[productData.category_id]?.name && (
                <span>
                  <span className="cart-secondary-text">Category: </span>
                  {categories[productData.category_id].name}
                </span>
              )}

              <span>
                <span className="cart-secondary-text">Year of production</span>:{" "}
                {productData.production_year}
              </span>
              <span>
                <span className="cart-secondary-text">Weight</span>:{" "}
                {Math.round(productData.weight)}g
              </span>
              <span>
                <span className="cart-secondary-text">*In stock</span>:{" "}
                {productData.quantity -
                  (cart.items[productData.id]?.quantity || 0)}
              </span>
              <a href="#description">View details</a>
              <span className="cart-secondary-text-small">
                * The reservation of the product will be confirmed solely upon
                receipt of payment.
              </span>
            </Col>
            <Col xs={12} md={3}>
              <CartBlock
                price={productData.price}
                discount={productData.discount}
                itemId={productId}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={8} className="px-0">
              <h5 className="text-center my-4">About this product</h5>
              <div className="pr-page-description mt-3">
                <p className="mb-0">{productData.description}</p>
              </div>
              <h5 className="text-center my-4">Detailed product info</h5>
              <div className="pr-page-full-details mt-3" id="description">
                <p>{}</p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={8} className="px-0">
              <h5 className="text-center my-4">Reviews</h5>
              <ReviewGallery refetchProduct={refetch} />
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default ProductPage;

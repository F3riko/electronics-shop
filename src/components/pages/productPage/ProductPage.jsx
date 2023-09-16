import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Carousel from "react-bootstrap/Carousel";
import CartBlock from "./CartBlock";
import { getProduct } from "../../../services/api/productApi/getProductApi";
import { getProductImg } from "../../../services/api/productApi/getProductImgApi";
import useFetch from "../../../utils/customHooks/useFetch";
import { useAuth } from "../../../contextProviders/AuthProvider";
import NoDataError from "../../shared/NoDataError";
import LoadingSpinner from "../../shared/LoadingSpinner";
import ThumbnailRender from "../../shared/ThumbnailRender";

const ProductPage = () => {
  const { productId } = useParams();
  const {
    data: productData,
    loading: productLoading,
    error: productError,
  } = useFetch(getProduct, productId);

  const {
    data: imgData,
    loading: imgLoading,
    error: imgError,
  } = useFetch(getProductImg, productId);
  const { categories } = useAuth();

  const { cart } = useAuth();

  return (
    <Container fluid className="pr-page-wrapper">
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
              <div className="pr-page-description mt-3">
                <h5 className="text-center">About this product</h5>
                <p>{productData.description}</p>
              </div>
              <div className="pr-page-full-details my-2" id="description">
                <h5 className="text-center">Detailed product info</h5>
                <p>
                  {/* Get list of properties here */}
                  {/* {Object.entries(properties).map((key, value) => {
                    return (
                      <span>
                        {key}: {value}
                      </span>
                    );
                  })} */}
                </p>
              </div>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default ProductPage;

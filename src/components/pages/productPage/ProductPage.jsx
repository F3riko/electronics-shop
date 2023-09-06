import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Carousel from "react-bootstrap/Carousel";
import CartBlock from "./CartBlock";
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
  } = useFetch(getProduct, productId);

  const {
    data: imgData,
    loading: imgLoading,
    error: imgError,
  } = useFetch(getProductImg, productId);
  const { categories } = useAuth();

  return (
    <Container>
      {productLoading && <h1>Wait</h1>}
      {productData && (
        <>
          <Row>
            <h4 className="text-center mt-3">{productData.title}</h4>
          </Row>
          <Row>
            <Col xs={12} md={3} className="pr-page-gallery-wrapper">
              <Carousel fade variant="dark">
                <Carousel.Item className="text-center">
                  <Image
                    src={
                      imgLoading || !imgData
                        ? "/images/other/placeholder-171-180.png"
                        : imgData
                    }
                    className={
                      imgLoading || !imgData
                        ? "product-tile-thubmnail"
                        : "product-tile-thubmnail-image"
                    }
                  />
                </Carousel.Item>
                <Carousel.Item className="text-center">
                  <Image
                    tesrc="/images/other/placeholder-171-180.png"
                    className="pr-page-main-image"
                  />
                </Carousel.Item>
                <Carousel.Item className="text-center">
                  <Image
                    src="/images/other/placeholder-171-180.png"
                    className="pr-page-main-image"
                  />
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
                  Category: {categories[productData.category_id].name}
                </span>
              )}

              <span>Year of production: {productData.year_of_production}</span>
              <span>Weight: {productData.weight}g</span>
              <span>In stock: {productData.stock_quantity}</span>
              <a href="#description">View details</a>
            </Col>
            <Col xs={12} md={4}>
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
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                  vel consequat purus. Vivamus nec pulvinar risus. Donec nisl
                  risus, euismod quis posuere et, ullamcorper vitae eros. Aenean
                  ultrices mi id dolor porta, sit amet dictum tortor facilisis.
                  Maecenas erat magna, venenatis eu aliquam ac, blandit quis
                  odio. Mauris vitae dignissim urna. Ut at vulputate ipsum.
                  Donec ornare consectetur interdum. Suspendisse potenti. Sed
                  libero sem, euismod non tellus in, egestas tempor urna.
                  Phasellus finibus molestie elit, vel accumsan nulla convallis
                  id. Nunc gravida magna quam, ac dictum elit sagittis vitae.
                  Aliquam mi urna, sagittis nec rutrum et, gravida eu tellus.
                  Sed bibendum dolor placerat quam luctus scelerisque. Donec
                  lorem nulla, finibus feugiat elit ac, ultrices scelerisque
                  orci. Donec ac nisl nisi.
                </p>
              </div>
              <div className="pr-page-full-details my-2" id="description">
                <h5 className="text-center">Detailed product info</h5>
                <p>
                  category: Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit. Praesentium sapiente delectus aspernatur rem officia.
                  Modi cupiditate magni ducimus fugit quas impedit, sed
                  doloribus molestiae nam.
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

import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Carousel from "react-bootstrap/Carousel";
import CartBlock from "./productPageCartBlock/CartBlock";
import { getProduct } from "../../../services/api/getProduct-api";
import useFetch from "../../../utils/useFetch";
import { useAuth } from "../../supportComponents/AuthProvider";

const ProductPage = () => {
  const { productId } = useParams();
  const { data, loading, error } = useFetch(getProduct, [productId]);
  const { categories } = useAuth();

  return (
    <Container>
      {loading && <h1>Wait</h1>}
      {data && (
        <>
          <Row>
            <h4 className="text-center mt-3">{data.name}</h4>
          </Row>
          <Row>
            <Col xs={12} md={3} className="pr-page-gallery-wrapper">
              <Carousel fade variant="dark">
                <Carousel.Item className="text-center">
                  <Image
                    src="/placeholder1.png"
                    className="pr-page-main-image"
                  />
                </Carousel.Item>
                <Carousel.Item className="text-center">
                  <Image
                    tesrc="/placeholder1.png"
                    className="pr-page-main-image"
                  />
                </Carousel.Item>
                <Carousel.Item className="text-center">
                  <Image
                    src="/placeholder1.png"
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
              {categories && categories[data.category_id]?.name && (
                <span>Category: {categories[data.category_id].name}</span>
              )}

              <span>Year of production: {data.year_of_production}</span>
              <span>Weight: {data.weight}g</span>
              <span>In stock: {data.stock_quantity}</span>
              <a href="#description">View details</a>
            </Col>
            <Col xs={12} md={4}>
              <CartBlock
                price={data.price}
                discount={data.discount}
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

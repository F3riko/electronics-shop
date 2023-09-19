import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import CustomLink from "../CustomLink";
import { useState, useEffect } from "react";
import { getCategoryNameById } from "../../../utils/categoriesOprations/categoryUtils";
import Counter from "../Counter";
import PriceBlock from "../PriceBlock";
import { useAuth } from "../../../contextProviders/AuthProvider";
import useFetch from "../../../utils/customHooks/useFetch";
import { getProductImg } from "../../../services/api/productApi/getProductImgApi";
import ThumbnailRender from "../ThumbnailRender";
import CartButton from "../CartButton";
import LikeButton from "../LikeButton";
import RatingComponent from "../RatingElement";

const ProductPreviewCard = ({ productData }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const { categories } = useAuth();
  const categoryName = getCategoryNameById(categories, productData.category_id);
  const { data, loading, error } = useFetch(getProductImg, productData.id);
  const { handleCart, cart, fetchStatus } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const ProductTitle = () => {
    return (
      <Row className="mb-2 product-title-text">
        <CustomLink to={`/product/${productData.id}`}>
          <Col>{productData.title}</Col>
        </CustomLink>
      </Row>
    );
  };
  console.log(productData.item_rating);

  return (
    <Container fluid className="product-tile-wrapper">
      <Row>
        <Col xs={12} md={3} className="product-tile-thubmnail-wrapper">
          <Link to={`/product/${productData.id}`}>
            <ThumbnailRender data={data} loading={loading} error={error} />
          </Link>
        </Col>

        <Col className="mt-1 middle-column">
          <ProductTitle />
          <Row>
            <span>
              <span className="cart-secondary-text">Category</span>:{" "}
              {categoryName}
            </span>
            <span>
              <span className="cart-secondary-text">Year of production</span>:{" "}
              {productData.production_year}
            </span>
            <span>
              <span className="cart-secondary-text">Weight</span>:{" "}
              {Math.round(productData.weight)}g
            </span>
            <span>
              <span className="cart-secondary-text">In stock</span>:{" "}
              {productData.quantity -
                (cart.items[productData.id]?.quantity || 0)}
            </span>
          </Row>
          <Row>
            <Col className="d-flex flex-column">
              <span>
                {productData.item_rating === 0 ? (
                  <>
                    <FontAwesomeIcon
                      icon={faStar}
                      className="cart-secondary-text"
                    />
                    <span style={{ marginLeft: "2px" }}>
                      {productData.item_rating}
                    </span>
                  </>
                ) : (
                  <RatingComponent
                    initialValue={
                      productData.item_rating / productData.reviews_quantity
                    }
                  />
                )}
              </span>
              <span>
                <FontAwesomeIcon
                  icon={faComment}
                  className="cart-secondary-text"
                />
                <span className="mx-1">{productData.reviews_quantity}</span>
              </span>
            </Col>
          </Row>
        </Col>

        {isSmallScreen && <ProductTitle />}
        <Col
          xs={12}
          md={3}
          className="d-flex flex-column justify-content-between"
        >
          <Row>
            <Col className="d-flex justify-content-between align-items-center">
              <PriceBlock
                price={productData.price}
                discount={productData.discount}
              />
              <LikeButton productId={productData.id} />
            </Col>
          </Row>
          {cart.items[productData.id] === undefined ? (
            <CartButton id={productData.id} />
          ) : (
            <Counter
              handleCounter={handleCart}
              cartState={cart.items[productData.id].quantity}
              itemId={productData.id}
              error={fetchStatus.cartCounterError}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductPreviewCard;

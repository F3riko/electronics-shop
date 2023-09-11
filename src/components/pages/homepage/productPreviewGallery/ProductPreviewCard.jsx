import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import CustomLink from "../../../shared/CustomLink";
import { useContext, useState, useEffect } from "react";
import { HomeContext } from "../Homepage";
import { getCategoryNameById } from "../../../../utils/categoriesOprations/categoryUtils";
import Counter from "../../../shared/Counter";
import PriceBlock from "../../../shared/PriceBlock";
import { useAuth } from "../../../../contextProviders/AuthProvider";
import useFetch from "../../../../utils/customHooks/useFetch";
import { getProductImg } from "../../../../services/api/productApi/getProductImgApi";
import ThumbnailRender from "../../../shared/ThumbnailRender";
import CartButton from "../../../shared/CartButton";
import LikeButton from "../../../shared/LikeButton";

const ProductPreviewCard = ({ productData }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  // const categories = useContext(HomeContext);
  // const categoryName = getCategoryNameById(categories, productData.category_id);
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
        <CustomLink to={`product/${productData.id}`}>
          <Col>{productData.title}</Col>
        </CustomLink>
      </Row>
    );
  };

  return (
    <Container fluid className="product-tile-wrapper">
      <Row>
        <Col xs={12} md={3} className="product-tile-thubmnail-wrapper">
          <Link to={`product/${productData.id}`}>
            <ThumbnailRender data={data} loading={loading} error={error} />
          </Link>
        </Col>

        <Col className="mt-1 middle-column">
          <ProductTitle />
          <Row>
            {/* <span>
              <span className="cart-secondary-text">Category</span>:{" "}
              {categoryName}
            </span> */}
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
            <Col>
              <span className="me-2">
                <FontAwesomeIcon icon={faStar} style={{ color: "fbce2d" }} />
                <span className="mx-1">
                  {parseFloat(productData.item_rating).toFixed(1)}
                </span>
              </span>
              <span>
                <FontAwesomeIcon icon={faComment} />
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

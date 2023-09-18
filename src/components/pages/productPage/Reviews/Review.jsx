import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Rating from "react-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";

const Review = ({ reviewData }) => {
  return (
    <Container className="review-wrapper">
      <Row className="review-name-rating-wrapper">
        <Col className="review-name">{reviewData.name}</Col>
        <Col className="review-rating">
          <Rating
            fractions={2}
            initialRating={reviewData.rating}
            readonly
            emptySymbol={
              <FontAwesomeIcon
                size="xl"
                icon={faStar}
                style={{ color: "#ccc" }}
              />
            }
            fullSymbol={
              <FontAwesomeIcon
                icon={faStarSolid}
                style={{ color: "#ffe32e" }}
                size="xl"
              />
            }
          />
        </Col>
      </Row>
      {reviewData.liked && (
        <Row>
          <Col>
            <h6 className="mb-3">What I like about the product:</h6>
            <p className="review-inner-field">{reviewData.liked}</p>
          </Col>
        </Row>
      )}
      {reviewData.not_liked && (
        <Row>
          <Col>
            <h6 className="mb-3">What I don't like:</h6>
            <p className="review-inner-field">{reviewData.not_liked}</p>
          </Col>
        </Row>
      )}
      {reviewData.comment && (
        <Row>
          <Col>
            <h6 className="mb-3">Comment:</h6>
            <p className="review-inner-field">{reviewData.comment}</p>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Review;

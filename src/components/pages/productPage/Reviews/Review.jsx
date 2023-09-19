import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import RatingComponent from "../../../shared/RatingElement";

const Review = ({ reviewData }) => {
  return (
    <Container className="review-wrapper">
      <Row className="review-name-rating-wrapper">
        <Col className="review-name">{reviewData.name}</Col>
        <Col className="review-rating">
          <RatingComponent initialValue={reviewData.rating} size={"xl"} />
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

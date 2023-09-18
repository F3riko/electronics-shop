import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Rating from "react-rating";
import Form from "react-bootstrap/Form";
import ValidationErrorElement from "../../shared/ValidationError";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../../contextProviders/AuthProvider";
import {
  validateAllInput,
  handleChange,
  handleBlur,
  renderErrors,
} from "../../../utils/validations/validationFunctions";
import { defaultReviewData } from "../../../utils/validations/reviewValidations";
import { postNewReview } from "../../../services/authService/userAuth/authorization/postNewReview";
import { useParams } from "react-router-dom";

const ReviewForm = ({ refetch, handleClose }) => {
  const [reviewData, setReviewData] = useState(defaultReviewData);
  const { productId } = useParams();
  const [fetchStatus, setFetchStatus] = useState({
    loading: false,
    error: false,
  });
  const { user } = useAuth();

  const handleRatingChange = (value) => {
    setReviewData((prevData) => ({
      ...prevData,
      ["rating"]: { ...prevData["rating"], value: value, errors: [] },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const errors = validateAllInput(reviewData, setReviewData);
      if (!errors) {
        setFetchStatus((prevData) => ({ ...prevData, loading: true }));
        const reviewObject = {};
        for (const field of Object.keys(reviewData)) {
          if (reviewData[field].value) {
            reviewObject[field] = reviewData[field].value;
          }
        }
        await postNewReview(reviewObject, productId, user.name, user.id);
        refetch()
        handleClose()
      }
    } catch (error) {
      setFetchStatus((prevData) => ({ ...prevData, error: true }));
      setTimeout(() => {
        setFetchStatus((prevData) => ({ ...prevData, error: false }));
      }, 3000);
    } finally {
      setFetchStatus((prevData) => ({ ...prevData, loading: false }));
    }
  };

  return (
    <Container className="review-wrapper">
      <Form onSubmit={handleSubmit}>
        <Row className="review-name-rating-wrapper">
          <Col className="review-name">{user.name}</Col>
          <Col className="review-rating d-flex flex-column">
            <Rating
              initialRating={reviewData.rating.value}
              onChange={handleRatingChange}
              fractions={2}
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
            <span className="me-4">{renderErrors("rating", reviewData)}</span>
          </Col>
        </Row>
        <Row>
          <Col>
            <h6 className="mb-3">What I like about the product:</h6>
            <Form.Group controlId="liked">
              <Form.Control
                as="textarea"
                placeholder="What do you like about this product?"
                className="review-form-textarea"
                onBlur={(e) => handleBlur(e, reviewData, setReviewData)}
                onChange={(e) => handleChange(e, setReviewData)}
              />
              <Form.Text className="text-center">
                {renderErrors("liked", reviewData)}
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <h6 className="my-3">What I don't like:</h6>
            <Form.Group controlId="not_liked">
              <Form.Control
                as="textarea"
                placeholder="What you do not like about this product?"
                className="review-form-textarea"
                onBlur={(e) => handleBlur(e, reviewData, setReviewData)}
                onChange={(e) => handleChange(e, setReviewData)}
              />
              <Form.Text className="text-center">
                {renderErrors("not_liked", reviewData)}
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <h6 className="my-3">Comment:</h6>
            <Form.Group controlId="comment">
              <Form.Control
                as="textarea"
                placeholder="Any additional information you want to share with future customers of the product"
                className="review-form-textarea"
                onBlur={(e) => handleBlur(e, reviewData, setReviewData)}
                onChange={(e) => handleChange(e, setReviewData)}
              />
              <Form.Text className="text-center">
                {renderErrors("comment", reviewData)}
                {fetchStatus.error && <ValidationErrorElement />}
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              variant={fetchStatus.error ? "danger" : "primary"}
              type="submit"
              className="w-100 py-2 my-4"
            >
              {fetchStatus.loading ? (
                <Spinner size="sm" />
              ) : fetchStatus.error ? (
                "Sorry, something went wrong"
              ) : (
                "Review this item"
              )}
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default ReviewForm;

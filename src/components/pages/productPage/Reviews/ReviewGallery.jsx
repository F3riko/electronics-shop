import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Review from "./Review";
import Button from "react-bootstrap/Button";
import useFetch from "../../../../utils/customHooks/useFetch";
import Spinner from "react-bootstrap/Spinner";
import { getProductsReviews } from "../../../../services/api/productApi/getProductsReviewsApi";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../../shared/LoadingSpinner";
import ReviewForm from "../../../forms/usualForms/ReviewForm";
import { useState } from "react";
import { useAuth } from "../../../../contextProviders/AuthProvider";
import { reviewAuth } from "../../../../services/authService/reviewRightAuth";

const ReviewGallery = () => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { productId } = useParams();
  const [fetchStatus, setFetchStatus] = useState({
    authLoading: false,
    authError: false,
  });
  const { data, error, loading, refetch } = useFetch(
    getProductsReviews,
    productId
  );
  const { user } = useAuth();

  const handleShowReview = async () => {
    try {
      setFetchStatus((prevData) => ({ ...prevData, authLoading: true }));
      await reviewAuth(user.id, productId);
      setShowReviewForm(true);
    } catch (error) {
      setFetchStatus((prevData) => ({ ...prevData, authError: true }));
      setTimeout(() => {
        setFetchStatus((prevData) => ({ ...prevData, authError: false }));
      }, 3000);
    } finally {
      setFetchStatus((prevData) => ({ ...prevData, authLoading: false }));
    }
  };

  return (
    <Container className="px-0">
      {data && data.length === 0 && (
        <p
          className="text-center review-wrapper pb-3"
          style={{ fontSize: "18px" }}
        >
          No one has posted any review so far
        </p>
      )}
      {data &&
        data.map((review) => {
          return (
            <Row key={review.id} className="mb-3">
              <Col>
                <Review reviewData={review} />
              </Col>
            </Row>
          );
        })}
      {loading && <LoadingSpinner />}
      {error && (
        <div className="review-wrapper">
          <h6 className="text-center">Oops.. Something went wrong</h6>
          <p>
            We couldn't retrieve comments from the server. Please, reload the
            page or try again later
          </p>
        </div>
      )}
      {user && user?.id && (
        <Button
          variant={fetchStatus.authError ? "danger" : "primary"}
          className="w-100 my-3"
          onClick={handleShowReview}
        >
          {fetchStatus.authLoading ? (
            <Spinner size="sm" />
          ) : fetchStatus.authError ? (
            "You need to buy it first or you'have already reviewed this product"
          ) : (
            "Review this item"
          )}
        </Button>
      )}
      {showReviewForm && (
        <ReviewForm refetch={refetch} handleClose={() => setShowReviewForm(false)} />
      )}
    </Container>
  );
};

export default ReviewGallery;

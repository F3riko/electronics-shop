import Rating from "react-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";

const RatingComponent = ({ initialValue, onChange, size, readOnly = true }) => {
  return (
    <Rating
      readonly={readOnly}
      initialRating={initialValue}
      onChange={onChange}
      fractions={2}
      emptySymbol={
        <FontAwesomeIcon size={size} icon={faStar} style={{ color: "#ccc" }} />
      }
      fullSymbol={
        <FontAwesomeIcon
          icon={faStarSolid}
          style={{ color: "#ffe32e" }}
          size={size}
        />
      }
    />
  );
};

export default RatingComponent;

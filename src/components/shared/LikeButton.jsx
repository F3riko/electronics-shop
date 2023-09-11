import Overlay from "react-bootstrap/Overlay";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../contextProviders/AuthProvider";

const LikeButton = ({ productId, overlayPosition }) => {
  const { wishList, handleLikeDislike, user } = useAuth();
  const [liked, setLiked] = useState(false);
  const [error, setError] = useState(false);
  const target = useRef(null);

  useEffect(() => {
    if (wishList) {
      setLiked(wishList.includes(parseInt(productId)));
    }
  }, [wishList]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 1500);
    }
  });

  const handleLike = async (action) => {
    try {
      if (error) {
        setError(false);
      }
      if (user?.id) {
        await handleLikeDislike(user.id, productId, action);
      } else {
        setError("You need to register first! =)");
      }
    } catch (error) {
      setError("Something went wrong");
    }
  };

  return (
    <>
      {liked ? (
        <FontAwesomeIcon
          icon={faHeartSolid}
          style={{ color: "#f8104b" }}
          size="lg"
          onClick={() => handleLike("del")}
          className="me-1"
          ref={target}
        />
      ) : (
        <FontAwesomeIcon
          ref={target}
          icon={faHeart}
          onClick={() => handleLike("add")}
          size="lg"
          className="me-1"
        />
      )}
      <Overlay
        target={target.current}
        show={error}
        placement={overlayPosition || "bottom"}
      >
        <div className="like-btn-overlay">{error}</div>
      </Overlay>
    </>
  );
};

export default LikeButton;

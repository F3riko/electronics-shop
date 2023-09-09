import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "react-bootstrap/Image";
import Spinner from "react-bootstrap/Spinner";
import { faImage } from "@fortawesome/free-regular-svg-icons";

const ThumbnailRender = ({ loading, data, error }) => {
  return (
    <>
      {loading && <Spinner animation="grow" variant="primary" className="" />}
      {data && <Image src={data} className="product-tile-thubmnail-image" />}
      {error && (
        <FontAwesomeIcon
          icon={faImage}
          style={{ color: "#0e59e2" }}
          size="2xl"
        />
      )}
    </>
  );
};

export default ThumbnailRender;

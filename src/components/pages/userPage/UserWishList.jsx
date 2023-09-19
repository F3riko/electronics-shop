import { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import ProductPreviewGallery from "../../shared/productPreviewGallery/ProductPreviewGallery";
import { useAuth } from "../../../contextProviders/AuthProvider";
import { getSelectedProducts } from "../../../services/api/productApi/getSelectedProducstApi";
import LoadingSpinner from "../../shared/LoadingSpinner";

const UserWishList = () => {
  const { wishList } = useAuth();
  const [fetchStatus, setFetchStatus] = useState({
    dataError: false,
    dataLoading: false,
  });
  const [data, setData] = useState({});

  useEffect(() => {
    (async () => {
      try {
        if (data) setData({});
        if (fetchStatus.dataError)
          setFetchStatus((prevData) => ({ ...prevData, dataError: false }));
        if (wishList.length > 0) {
          setFetchStatus((prevData) => ({ ...prevData, dataLoading: true }));
          const data = await getSelectedProducts(wishList);
          setData(data);
        }
      } catch (error) {
        setFetchStatus((prevData) => ({ ...prevData, dataError: true }));
      } finally {
        setFetchStatus((prevData) => ({ ...prevData, dataLoading: false }));
      }
    })();
  }, [wishList]);

  return (
    <Container style={{ minHeight: "60vh" }}>
      {wishList.length === 0 && (
        <h3 className="my-5 py-5 text-center">
          Oops, your wishslist is empty!
        </h3>
      )}
      {fetchStatus.dataError && (
        <h3 className="my-5 py-5 text-center">Oops, an error occurred!</h3>
      )}
      {fetchStatus.dataLoading && <LoadingSpinner />}
      {data && wishList.length > 0 && (
        <>
          <p style={{ fontSize: "18px" }} className="text-center">
            Welcome to your Wishlist page! Here, you can browse through the
            items you've added, easily move them to your cart, or simply remove
            them if you've had a change of heart. <br></br>It's all about making
            your shopping experience a breeze!
          </p>
          <ProductPreviewGallery
            productsData={data}
            loading={fetchStatus.dataLoading}
          />
        </>
      )}
    </Container>
  );
};

export default UserWishList;

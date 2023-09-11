import { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import ProductPreviewGallery from "../homePage/productPreviewGallery/ProductPreviewGallery";
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
    <Container>
      {wishList.length === 0 && (
        <h3 className="my-5 py-5 text-center">
          Oops, your wishslist is empty!
        </h3>
      )}
      {fetchStatus.dataError && (
        <h3 className="my-5 py-5 text-center">Oops, an error occurred!</h3>
      )}
      {fetchStatus.dataLoading && <LoadingSpinner />}
      {data && (
        <ProductPreviewGallery
          productsData={data}
          loading={fetchStatus.dataLoading}
        />
      )}
    </Container>
  );
};

export default UserWishList;

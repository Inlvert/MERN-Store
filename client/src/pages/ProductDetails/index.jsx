import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getProduct } from "../../redux/slices/productSlice";
import Header from "../../components/Header";
import CONSTANTS from "../../constants";
import styles from "./ProductDetailsPage.module.scss"

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.product);

  useEffect(() => {
    if (productId) {
      dispatch(getProduct(productId));
    }
  }, [dispatch, productId]);

  console.log(product);

  return (
    <div>
      <Header />
      <h1>ProductDetailsPage</h1>

      {product ? (
        <>
          <h2>{product.name}</h2>
          {product.images?.map((image, index) => (
            <div key={index}>
              <img
                src={`${CONSTANTS.HTTP_SERVER_URL}/images/${image}`}
                alt={`Existing ${index + 1}`}
                className={styles.previews}
              />
            </div>
          ))}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductDetailsPage;

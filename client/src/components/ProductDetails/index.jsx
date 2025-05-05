import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import CONSTANTS from "../../constants";
import { getProduct } from "../../redux/slices/productSlice";
import styles from "./ProductDetails.module.scss";
import placeholderImg from "../../assets/placeholder.png";

function ProductDetails() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.product);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    if (productId) {
      dispatch(getProduct(productId));
    }
  }, [dispatch, productId]);

  useEffect(() => {
    if (product?.images?.length > 0) {
      setMainImage(`${CONSTANTS.HTTP_SERVER_URL}/images/${product.images[0]}`);
    } else {
      setMainImage(placeholderImg);
    }
  }, [product]);

  return (
    <div>
      <h1>ProductDetails</h1>
      {product ? (
        <>
          <div className={styles.cover}>
            <div className={styles.imageSideLeft}>
              <div className={styles.mainImage}>
                <img
                  src={mainImage}
                  alt="Main product"
                  className={styles.largeImage}
                />
              </div>

              <div className={styles.thumbnails}>
                {product.images?.length > 0 ? (
                  product.images.map((image, index) => (
                    <img
                      key={index}
                      src={`${CONSTANTS.HTTP_SERVER_URL}/images/${image}`}
                      alt={`Thumbnail ${index + 1}`}
                      className={styles.thumbnail}
                      onClick={() =>
                        setMainImage(
                          `${CONSTANTS.HTTP_SERVER_URL}/images/${image}`
                        )
                      }
                    />
                  ))
                ) : (
                  <img
                    src={placeholderImg}
                    alt="No image"
                    className={styles.thumbnail}
                  />
                )}
              </div>
            </div>
            <div className={styles.imageSideRight}>
              <h1>{product.name}</h1>
              <h2>{product.category}</h2>
              <p>{product.description}</p>
              <h3>{product.price} - $</h3>
              <button>add to cart</button>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ProductDetails;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, nextPage, prevPage } from "../../redux/slices/productSlice";
import styles from "./ProductList.module.scss";
import CONSTANTS from "../../constants";
import placeholderImg from "../../assets/placeholder.png";

function ProductList() {
  const dispatch = useDispatch();
  const { products, totalPages, currentPage } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getProducts(currentPage));
  }, [dispatch, currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(nextPage());
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(prevPage());
    }
  };

  return (
    <div>
      <h1>ProductList</h1>
      <ul className={styles.ulCover}>
        {products.map((product) => (
          <li key={product._id} className={styles.liCover}>
            <img
              src={
                product.images && product.images.length > 0
                  ? `${CONSTANTS.HTTP_SERVER_URL}/images/${product.images[0]}`
                  : placeholderImg
              }
              alt=""
              className={styles.imageWrapper}
            />
            <h1>{product.name}</h1>
            <h1>{product.price}-$</h1>
          </li>
        ))}
      </ul>
      <div>
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={styles.btn}
        >
          Prev
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={styles.btn}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ProductList;

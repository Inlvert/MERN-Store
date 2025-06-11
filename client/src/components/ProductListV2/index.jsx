import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router";
import {
  getProducts,
  nextPage,
  prevPage,
  resetPagination,
  setPage,
} from "../../redux/slices/productSlice";
import styles from "./ProductList.module.scss";
import CONSTANTS from "../../constants";
import placeholderImg from "../../assets/placeholder.png";
import Cartbutton from "../Cartbutton";

function ProductListV2({ mode = "full", limit = 0 }) {
  const dispatch = useDispatch();
  const { products, totalPages, currentPage } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(resetPagination());
  }, [mode, dispatch]);

  useEffect(() => {
    dispatch(
      getProducts({
        page: currentPage,
        limit: mode === "limited" ? limit : null,
      })
    );
  }, [dispatch, currentPage, limit, mode]);

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

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => dispatch(setPage(i))}
          className={`${styles.btn} ${
            currentPage === i ? styles.activeBtn : ""
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div>
      <h1 className={styles.textCover}>NEW ARRIVALS</h1>
      <ul className={styles.ulCover}>
        {products.map((product) => (
          <li key={product._id} className={styles.liCover}>
            <NavLink to={`/products/${product._id}`} className={styles.navLinl}>
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
            </NavLink>
            <div className={styles.priceCart}>
              <h2>${product.price}</h2>
              <Cartbutton product={product} />
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.paginationContainer}>
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={styles.btn}
        >
          Prev
        </button>
        {renderPageNumbers()}
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

export default ProductListV2;

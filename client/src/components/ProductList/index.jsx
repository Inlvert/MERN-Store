import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router";
import {
  getProducts,
  nextPage,
  prevPage,
  setPage,
  addProductToCart,
} from "../../redux/slices/productSlice";
import styles from "./ProductList.module.scss";
import CONSTANTS from "../../constants";
import placeholderImg from "../../assets/placeholder.png";

function ProductList() {
  const dispatch = useDispatch();
  const { products, totalPages, currentPage } = useSelector(
    (state) => state.product
  );
  const user = useSelector((state) => state.auth?.user);
  const cartId = useSelector((state) => state.auth?.user?.cart);

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

  const hendleAddProductToCart = (productId) => {
    dispatch(addProductToCart({ productId, cartId, quantity: 1 }));
  };

  return (
    <div>
      <h1>ProductList</h1>
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
              <h1>{product.price}-$</h1>
            </NavLink>
            <button onClick={() => hendleAddProductToCart(product._id)}>
              add to cart
            </button>
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

export default ProductList;

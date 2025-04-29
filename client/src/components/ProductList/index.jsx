import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/slices/productSlice";
import styles from "./ProductList.module.scss"

function ProductList() {
  const dispatch = useDispatch();
  const { products, totalPages, currentPage } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getProducts(currentPage));
  }, [dispatch, currentPage]);

  return (
    <div>
      <h1>ProductList</h1>
      <ul className={styles.ulCover}>
        {products.map((product) => (
          <li key={product._id} className={styles.liCover}>
            <h1>{product.name}</h1>
            <h1>{product.price}-$</h1>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;

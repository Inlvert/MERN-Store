import React from "react";
import { ReactComponent as CartIcon } from "../../assets/svg/shopping-cart.svg";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "../../redux/slices/productSlice";
import styles from "./Cartbutton.module.scss";

const Cartbutton = (props) => {
  const {
    product: { _id },
  } = props;
  const cartId = useSelector((state) => state.auth?.user?.cart);
  const dispatch = useDispatch();

  const hendleAddProductToCart = (productId) => {
    dispatch(addProductToCart({ productId, cartId, quantity: 1 }));
  };

  return (
    <CartIcon onClick={() => hendleAddProductToCart(_id)} title="Add to Cart" className={styles.icon}/>
  );
};

export default Cartbutton;

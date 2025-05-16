import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../redux/slices/cartSlice";
import CONSTANTS from "../../constants";
import placeholderImg from "../../assets/placeholder.png";
import styles from "./CartList.module.scss";
import { updateQuantity } from "../../redux/slices/cartProductSlice";


const CartList = () => {
  const products = useSelector((state) => state.cart.cartProducts);
  const cartId = useSelector((state) => state.auth?.user?.cart);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();

  console.log('products is:', products.length)

  const [quantity, setQuantity] = useState({});

  useEffect(() => {
    if (cartId) {
      dispatch(getCart({ cartId }));
    }
  }, [dispatch, cartId]);

  useEffect(() => {
    if(products.length > 0) {
      const initialQuantities = {};
      products.forEach((item) => {
        initialQuantities[item._id] = item.quantity;
      });
      setQuantity(initialQuantities);
      console.log('initialQuantities', initialQuantities)
    }
  }, [products])
  
  const incrementQuantity = (cartProductId) => {
    const newQuantity = quantity[cartProductId] + 1;
    setQuantity((prev) => ({
      ...prev,
      [cartProductId]: newQuantity,
    }));
    dispatch(updateQuantity({cartProductId, quantity: newQuantity}));
    dispatch(getCart({ cartId }));
  }


  const decrementQuantity = (cartProductId) => {
    const newQuantity = quantity[cartProductId] - 1;

    if(newQuantity >= 1) {
      setQuantity((prev) => ({
        ...prev,
        [cartProductId]: newQuantity,
      }));
      dispatch(updateQuantity({cartProductId, quantity: newQuantity}));
      dispatch(getCart({ cartId }));
    }
  }


  return (
    <div>
      <h2>CartList</h2>
      <ul className={styles.ulCover}>
        {products.map((item) => (
          <li key={item._id}>
            <img
              src={
                item.product.images && item.product.images.length > 0
                  ? `${CONSTANTS.HTTP_SERVER_URL}/images/${item.product.images[0]}`
                  : placeholderImg
              }
              alt=""
              style={{ width: "50px" }}
            />{" "}
            {item.product.name} — category: {item.product.category} — quantity:{" "}
            <button onClick={() => decrementQuantity(item._id)}>-</button>
            <input
              type="number"
              value={quantity[item._id] || 1}
              className={styles.textInput}
            />
            <button onClick={() => incrementQuantity(item._id)}>+</button>— ${item.product.price}
          </li>
        ))}
      </ul>
      <h3>{`Total Price - $ ${totalPrice}`}</h3>
    </div>
  );
};

export default CartList;

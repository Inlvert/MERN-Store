import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../redux/slices/cartSlice";
import CONSTANTS from "../../constants";
import placeholderImg from "../../assets/placeholder.png";

const CartList = () => {
  const products = useSelector((state) => state.cart.cartProducts);
  const cartId = useSelector((state) => state.auth?.user?.cart);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();

  console.log("cartId", cartId);

  useEffect(() => {
    if (cartId) {
      dispatch(getCart({ cartId }));
    }
  }, [dispatch, cartId]);

  console.log(products);
  console.log(totalPrice);

  return (
    <div>
      <h2>CartList</h2>
      <ul>
        {products.map((item) => (
          <li key={item._id}>
            <img
                src={
                  item.product.images && item.product.images.length > 0
                    ? `${CONSTANTS.HTTP_SERVER_URL}/images/${item.product.images[0]}`
                    : placeholderImg
                }
                alt=""
                style={{width: "50px"}}
              /> {item.product.name} — Кількість: {item.quantity}
          </li>
        ))}
      </ul>
      <h3>{`Total Price - $ ${totalPrice}` }</h3>
    </div>
  );
};

export default CartList;

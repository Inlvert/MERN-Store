import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUserOrders } from "../../redux/slices/orderSlice";
import CONSTANTS from "../../constants";
import placeholderImg from "../../assets/placeholder.png";
import styles from "./OrderList.module.scss";
import classNames from "classnames";
import { NavLink } from "react-router";

const OrderList = () => {
  const userId = useSelector((state) => state.auth?.user?._id);
  const orders = useSelector((state) => state.order?.orders);
  const [openOrders, setOpenOrders] = useState({});

  const dispatch = useDispatch();

  console.log(userId);
  useEffect(() => {
    if (userId) {
      dispatch(getAllUserOrders());
    }
  }, [dispatch, userId]);

  const handleClick = (orderId) => {
    setOpenOrders((prevState) => ({
      ...prevState,
      [orderId]: !prevState[orderId],
    }));
  };

  console.log(openOrders);

  return (
    <div className={styles.cover}>
      <h2>OrderList</h2>
      <ul className={styles.liCover}>
        {orders.map((order) => {
          const isOpen = openOrders[order._id] || false;

          const hidenDispaly = classNames(styles.panel, {
            [styles.unpanel]: !isOpen,
            [styles.panelOpen]: isOpen,
          });

          return (
            <li key={order._id}>
              <button
                className={styles.accordion}
                onClick={() => handleClick(order._id)}
              >
                Order Date: {new Date(order.createdAt).toLocaleDateString()}{" "}
                {new Date(order.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </button>
              <div className={hidenDispaly}>
                <ul className={styles.liCover}>
                  {order.cartProduct?.map((productItem, idx) => (
                    <li key={idx}>
                      <NavLink to={`/products/${productItem.product._id}`} className={styles.link}>
                        <img
                          src={
                            productItem.product.images &&
                            productItem.product.images.length > 0
                              ? `${CONSTANTS.HTTP_SERVER_URL}/images/${productItem.product.images[0]}`
                              : placeholderImg
                          }
                          alt=""
                          style={{ width: "30px" }}
                        />{" "}
                        {productItem?.product?.name || "Unknown Product"} – Qty:{" "}
                        {productItem.quantity} - $ {productItem.product.price}
                      </NavLink>
                    </li>
                  ))}
                  <h5>totalPrice - ${order.totalPrice}</h5>
                </ul>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default OrderList;

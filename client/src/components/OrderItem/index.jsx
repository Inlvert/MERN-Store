import React from "react";
import styles from "./OrderItem.module.scss";
import classNames from "classnames";
import { NavLink } from "react-router";
import CONSTANTS from "../../constants";
import placeholderImg from "../../assets/placeholder.png";

const OrderItem = ({ order, isOpen, onToggle }) => {
  const hidenDisplay = classNames(styles.panel, {
    [styles.unpanel]: !isOpen,
    [styles.panelOpen]: isOpen,
  });

  return (
    <li>
      <button className={styles.accordion} onClick={() => onToggle(order._id)}>
        Order Date: {new Date(order.createdAt).toLocaleDateString()}{" "}
        {new Date(order.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </button>
      <div className={hidenDisplay}>
        <ul className={styles.liCover}>
          {order.cartProduct?.map((productItem, idx) => (
            <li key={idx}>
              <NavLink
                to={`/products/${productItem.product._id}`}
                className={styles.link}
              >
                <img
                  src={
                    productItem.product.images?.[0]
                      ? `${CONSTANTS.HTTP_SERVER_URL}/images/${productItem.product.images[0]}`
                      : placeholderImg
                  }
                  alt=""
                  style={{ width: "30px" }}
                />
                {productItem.product?.name || "Unknown Product"} – Qty:{" "}
                {productItem.quantity} - $ {productItem.product.price}
              </NavLink>
            </li>
          ))}
          <h5>totalPrice - ${order.totalPrice}</h5>
        </ul>
      </div>
    </li>
  );
};

export default OrderItem;
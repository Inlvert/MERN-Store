import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUserOrders } from "../../redux/slices/orderSlice";
import styles from "./OrderList.module.scss";
import OrderItem from "../OrderItem";


const OrderList = () => {
  const userId = useSelector((state) => state.auth?.user?._id);
  const orders = useSelector((state) => state.order?.orders);
  const [openOrders, setOpenOrders] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(getAllUserOrders());
    }
  }, [userId]);

  const handleToggle = (orderId) => {
    setOpenOrders((prevState) => ({
      ...prevState,
      [orderId]: !prevState[orderId],
    }));
  };

  return (
    <div className={styles.cover}>
      <h2>OrderList</h2>
      <ul className={styles.liCover}>
        {orders.map((order) => (
          <OrderItem
            key={order._id}
            order={order}
            isOpen={openOrders[order._id]}
            onToggle={handleToggle}
          />
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
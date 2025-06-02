import React from "react";
import Header2 from "../../components/Header2";
import HookForm from "../../components/HookForm";
import styles from "./Admin.module.scss";

function AdminPage() {
  return (
    <>
      <Header2 />
      <h1>AdminPage</h1>
      <h2 className={styles.cover}>Add new product</h2>
      <HookForm />
    </>
  );
}

export default AdminPage;

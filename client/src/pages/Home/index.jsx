import React from "react";
import Header from "../../components/Header";
import ProductList from "../../components/ProductList";

function HomePage(props) {
  return (
    <div>
      <Header />
      <h1>HomePage</h1>
      <ProductList />
    </div>
  );
}

export default HomePage;

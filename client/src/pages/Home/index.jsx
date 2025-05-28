import React from "react";
import Header from "../../components/Header";
import ProductList from "../../components/ProductList";
import Carousel from "../../components/Carousel ";

function HomePage(props) {
  return (
    <div>
      <Header />
      <Carousel />
      <h1>HomePage</h1>
      <ProductList />
    </div>
  );
}

export default HomePage;

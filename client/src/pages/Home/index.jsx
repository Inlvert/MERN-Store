import React from "react";
import Header2 from "../../components/Header2"
import ProductList from "../../components/ProductList";
import Carousel from "../../components/Carousel ";

function HomePage(props) {
  return (
    <div>
      <Header2 />
      <Carousel />
      <h1>HomePage</h1>
      <ProductList />
    </div>
  );
}

export default HomePage;

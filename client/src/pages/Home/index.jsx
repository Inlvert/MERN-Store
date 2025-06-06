import React from "react";
import Header2 from "../../components/Header2"
import ProductList from "../../components/ProductList";
import Carousel from "../../components/Carousel ";
import BrandaLine from "../../components/BrandaLine";

function HomePage(props) {
  return (
    <div>
      <Header2 />
      <Carousel />
      <BrandaLine />
      <ProductList />
    </div>
  );
}

export default HomePage;

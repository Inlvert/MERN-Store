import React from "react";
import Header2 from "../../components/Header2"
import Carousel from "../../components/Carousel ";
import BrandaLine from "../../components/BrandaLine";
import ProductListV2 from "../../components/ProductListV2";
import ButtonLink from "../../components/ButtonLink";

function HomePage(props) {

  return (
    <div>
      <Header2 />
      <Carousel />
      <BrandaLine />
      <ProductListV2 mode="limited" limit={5}/>
      <ButtonLink text="View All"  link="/category"/>
    </div>
  );
}

export default HomePage;

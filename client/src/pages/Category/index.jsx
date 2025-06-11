import React from 'react'
import Header2 from '../../components/Header2'
import ProductListV2 from '../../components/ProductListV2'

const CategoryPage = () => {
  return (
    <div>
      <Header2 />
      <h1>CategoryPage</h1>
      <ProductListV2 mode="full"/>
      
    </div>
  )
}

export default CategoryPage
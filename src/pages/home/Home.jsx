import React from 'react'
import FilterNButtons from '../../components/topSection/FilterNButtons'
import Products from '../../components/listings/Products'


function Home() {
  return (
    <div>
      <FilterNButtons />
      <Products />
    </div>
  )
}

export default Home
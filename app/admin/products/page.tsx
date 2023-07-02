import React from 'react'
import ProductTable from './components/ProductsTable'
import "./style.css"

interface Props {}

const PorductsPage = (props: Props) => {
  return (
    <div>
        <ProductTable/>
    </div>
  )
}

export default PorductsPage
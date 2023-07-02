import React from 'react'
import ProductCard from '../../cardes/products/ProductCard'


function ProductsByCategory({category_name,products }) {

  return (
    <div>
      <div className='w-full px-1 mb-3 py-2 border-b border-gray'>
      <span className='font-semibold capitalize text-lg'>{category_name}</span>  
      </div>
      <div className='grid gap-2 grid-cols-4'>
        {
          products?.map((product, index) => {
            return <ProductCard key={index} product_data={product} />
          })
        }

      </div>
    </div>
  )
}


export default ProductsByCategory
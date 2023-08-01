import Link from 'next/link'
import React from 'react'
import ProductCard from '../../cardes/products/ProductCard'
import { FiChevronRight } from 'react-icons/fi'
import { ProductProps } from '@/lib/interfaces/modelsInterfaces'

function ProductsGroupe({ category = "", title = "no title", products }: { category: string, title: string, products: ProductProps[] }) {

  return (
    <section className="row">
      <div className="col_16">
        <div className="product-slider">
          <div className="card_title light">
            <h2 className='text-lg ml-3'>{title}</h2>
            <Link className='flex items-center space-x-2' href={`/c/${category}`}><span>{"VOIR PLUS"}</span><FiChevronRight /></Link>
          </div>
        </div>

        <div className="card products_groupe">
          {
            products?.map((product, index) => {
              return <ProductCard key={index} product_data={product} />
            })
          }
          <div>
          </div>

        </div>

      </div>
    </section>
  )
}



export default ProductsGroupe
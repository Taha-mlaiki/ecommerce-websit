"use client "
import { Product } from "@prisma/client"
import Image from "next/image"
import { FC } from "react"
import ProductCard from "./ProductCard"
import {productWithSubs} from "@/hooks/useCartStore"

type ProductListProps = {
    data: productWithSubs[],
    title:string
}

const ProductList:FC<ProductListProps> = ({data,title}) => {
  return (
    <div className="w-full overflow-hidden">
    <div className="mt-4">
      {data.length < 1 ? 
      <div className="flex my-40 w-full mt-10 h-full items-center justify-center font-bold text-center">
        No result found.
      </div>: 
      <>
      <p className="font-bold mb-5 text-xl lg:text-3xl">{title}</p>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 justify-center">
      {data.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      </div>
      </>
    }
    </div>
    </div>
  )
}

export default ProductList

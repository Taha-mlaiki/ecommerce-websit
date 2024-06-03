import React from 'react'
import { db } from '../../../../prisma/client'
import Billboard from '../_components/Billboard'
import Container from '@/components/Container'
import ProductList from '../_components/productsSection/ProductList'
import CategorProduct from './CategorProduct'

const page = async ({params}:{params:{categoryId:string}}) => {
    const category = await db.category.findFirst({
        where:{
            id:params.categoryId
        },
        include:{
          billboard:true
        }
    })
    const products = await db.product.findMany({
      where:{
        categoryId:params?.categoryId,
        isArchived:false
      },
      include:{
        category:true,
        size:true,
        color:true
      }
    })
    const sizes = await db.size.findMany({
      where:{
        storeName: category?.storeName
      }
    })
    const colors = await db.color.findMany({
      where:{
        storeName: category?.storeName
      }
    })
  return (
    <>
      <Billboard data={category!.billboard} />
      <CategorProduct products={products!} sizes={sizes} colors={colors} />
    </>
  )
}

export default page

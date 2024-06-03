import React from 'react'
import { db } from '../../../../../prisma/client'
import Container from '@/components/Container'
import { Separator } from '@/components/ui/separator'
import ProductList from '../../_components/productsSection/ProductList'
import Galery from '../_components/Galery'
import Info from '../_components/Info';
const page = async({params}:{params:{productId:string}}) => {
    const product = await db.product.findUnique({
        where:{
            id:params.productId
        },
        include:{
            category:true,
            size:true,
            color:true
        }
    })
    const suggestProducts = await db.product.findMany({
        where:{
            category:{
                name: product?.category.name
            }
        },
        include:{
            size:true,
            category:true,
            color:true
        }
    })
  return (
    <div>
        <Container className='min-h-[80vh] mb-10' >
            <div className='grid grid-cols-1 md:grid-cols-2'>
                <div className='w-full h-full flex items-center justify-center'>
                    <Galery images={product!.images} />
                </div>
                <div className='w-full h-full flex-col flex justify-center '>
                    <Info data={product!} />
                </div>
            </div>
        </Container>
        <Separator />
        <Container className='mt-5'>
            <ProductList title='Related Products' data={suggestProducts} />
        </Container>
    </div>
  )
}

export default page

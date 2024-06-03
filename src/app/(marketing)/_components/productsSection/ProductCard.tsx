"use client"
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader,CardContent, CardFooter } from '@/components/ui/card';
import useCart from '@/hooks/useCartStore';
import { formatter } from '@/lib/utils';
import type { Product, Size } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import {productWithSubs} from "@/hooks/useCartStore"


const ProductCard = ({product}:{product:productWithSubs}) => {

  const addProduct = useCart((state)=> state.addProduct)
    return (
        <Card className="max-w-sm w-full mx-auto cursor-pointer rounded overflow-hidden shadow-lg my-4 ">
          <CardHeader className=" aspect-square relative group">
            <Image
              src={product.images[0]} // Assuming the first image in the array is the primary image
              alt={product.name}
              fill
              className="w-full h-auto object-cover"
            />
            <div>
            </div>
          </CardHeader>
          <CardContent className='mt-3'>
            <div className='flex justify-between items-center'>
                <h2 className="font-bold text-xl">{product.name}</h2>
            </div>
                <p className='text-sm text-gray-400 mt-3'>
                  {
                     //@ts-ignore
                  product.category.name}
                </p>
                <div className='flex justify-between items-center'>
                  <Badge className='mt-2'>
                      {
                        //@ts-ignore
                      product.size.value
                      }    
                  </Badge>
                  <p className="text-gray-700 text-lg font-semibold">{
                  formatter.format(product.price)
                }</p>
                </div>
          </CardContent>
          <CardFooter className="p-4 flex justify-between items-end">
            <Button
            onClick={()=> addProduct(product)}
            >Add to Cart</Button>
            <Link href={`/product/${product.id}`}>
              <Button variant="outline">
                View Details
                </Button>
            </Link>
          </CardFooter>
        </Card>
      );
};

export default ProductCard

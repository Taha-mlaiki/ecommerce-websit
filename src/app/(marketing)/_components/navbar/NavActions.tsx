"use client";
import { Button } from '@/components/ui/button';
import { Router, ShoppingBag, Trash2 } from 'lucide-react';
import { useSession } from "next-auth/react"
import React, { useEffect, useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useCart from '@/hooks/useCartStore';
import { cn, formatter } from '@/lib/utils';
import Image from 'next/image';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';

const NavActions = () => {
  const [ismounted,setIsMounted] = useState(false)

  const searchParams = useSearchParams()
  const router = useRouter()
  const length = useCart((state) => state.cart.length);
  const products = useCart((state) => state.cart);
  const removeProduct = useCart((state) => state.removeProduct);
  const removeAll = useCart((state)=> state.removeAll)
  const total = useCart((state)=> state.total)
  const {data:session} = useSession()

  useEffect(()=>{
    setIsMounted(true)
    const success = searchParams.get("success")
    if(success === "0"){
      toast.error("Somthing went wrong")
    }else if(success === "1"){
      toast.success("payment completed")
      removeAll()
    }
  },[removeAll,searchParams])

  if(ismounted === false){
    return null
  }

  const onCheckout = async ()=>{
    try {
      if(!session?.user) return toast.error("You must loged in first ")
      const res = await axios.post("/api/checkout",{
        productIds:products.map((ele)=> ele.id),
        storeName: products[0].storeName
      })
      window.location = res.data.url
    } catch (error:any) {
      toast.error(error.response.data.error)
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" className="ms-auto gap-1 items-center rounded-xl me-2">
          <ShoppingBag className="w-4 h-4" />
          <p>{length}</p>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-72 p-4">
        <div className='pb-2 border-b mb-2 flex items-center justify-between'>
          <h1 className="text-lg font-semibold">Shopping Cart</h1>
          {length >= 2 && 
          <h2
            onClick={()=> removeAll()}
            className='text-sm text-red-500 cursor-pointer'>remove All</h2>     
          }
        </div>
        {length === 0 ? (
          <div className="flex justify-center items-center h-20">
            No items.
          </div>
        ) : (
          <div className="w-full flex flex-col gap-3">
            {products.map((item, index) => (
              <div
                key={item.id}
                className={cn(
                  'flex items-start justify-between',
                  length - 1 !== index && "border-b pb-3 mb-3"
                )}
              >
                <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                  <Image
                    className="object-cover"
                    src={item.images[0]}
                    fill
                    alt="product image"
                  />
                </div>
                <div className="flex-1 px-2">
                  <h2 className="font-bold text-sm">{item.name}</h2>
                  <p className="text-sm text-gray-500">
                    {formatter.format(item.price)}
                  </p>
                  <p
                  className="text-sm text-gray-500"
                  >{item.size.value}</p>
                  <div className='w-4 h-4 rounded-full border' style={{
                    //@ts-ignore
                    backgroundColor:item.color.value
                    }} />

                </div>
                <Trash2
                  onClick={() => removeProduct(item.id)}
                  className="w-5 h-5 text-gray-500 hover:text-red-500 cursor-pointer"
                />
              </div>
            ))}
            <div className='flex pt-2 justify-between border-t'>
              <p className='font-bold'>Total price</p>
              <p className='font-bold'>{formatter.format(total())}</p>
            </div>
            <Button
              disabled={length === 0}
              size="sm"
              variant="default"
              className="mt-4 w-full justify-center"
              onClick={() => onCheckout()}
            >
              Checkout
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default NavActions;

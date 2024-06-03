"use client"
import { auth } from '@/auth';
import { Color, Product, Size } from '@prisma/client';
import toast from 'react-hot-toast';
import { create } from 'zustand';
import {persist, createJSONStorage} from "zustand/middleware"

export type productWithSubs = Product & {
    size:Size,
    color:Color
}

interface cartState {
    cart:productWithSubs[]|[]
    addProduct:(product:productWithSubs)=> void
    removeProduct:(id:string) => void
    removeAll:()=> void
    total:()=> number
}

const useCart = create(
    persist<cartState>(
        (set,get)=> ({
            cart:[],
            addProduct: async (product)=> {
                const isExist = get().cart.find((item)=> item.id === product.id)
                if(isExist){
                    return  toast.error("Product already exist in the cart.")
                }
                toast.success("item added to the cart")
                return set({cart:[...get().cart,product]})
            },
            removeProduct(id) {
                const updatedCart = get().cart.filter((item)=> item.id !== id)
                toast.success("item removed from cart")
                return set({cart:updatedCart})
            },
            removeAll:()=>{
                set({cart:[]})
            },
            total: ()=> {
                const total = get().cart.reduce((prev,now)=> prev + now.price,0)
                return total
            } 
        }),
        {
            name:"cart-storage",
            storage: createJSONStorage(()=> localStorage)
        }
    )
)

export default useCart
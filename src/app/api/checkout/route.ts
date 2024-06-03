import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { db } from '../../../../prisma/client'
import { auth } from '@/auth'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!,{
    apiVersion:"2024-04-10",
    typescript:true
})

const corsHeaders = {
    "Access-Control-Allow-Origin":"*",
    "Access-Control-Allow-Methods":"GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers":"Content-Type, Authorization",
}
export async function OPTIONS(){
    return NextResponse.json({},{headers:corsHeaders})
}
export async function POST(req:NextRequest){
    const reqBody = await req.json()
    const {storeName,productIds} = reqBody
    const sessionAuth = await auth()
    try {
        if(!sessionAuth?.user) return NextResponse.json({error:"You must log in first"},{status:403})
        if(!productIds || productIds.length === 0) {
            return NextResponse.json({error:"Product Ids are required"},{status:400})
        }
        const products = await db.product.findMany({
            where:{
                id:{
                    in:productIds
                }
            }
        })
        const line_items : Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    
      products.forEach((product)=> {
            line_items.push({
                quantity:1,
                price_data: {
                    currency:"USD",
                    product_data:{
                        name:product.name
                    },
                    unit_amount: product.price * 100
                }
            })
        })
        const order = await db.order.create({
            data: {
              storeName,
              isPaid: false,
              orderItems: {
                create: productIds.map((id: string) => ({
                  product: {
                    connect: { id },
                  },
                })),
              },
            },
        });
        const session = await stripe.checkout.sessions.create({
            line_items,
            mode:"payment",
            billing_address_collection:"required",
            phone_number_collection:{
                enabled:true
            },
            success_url:`${process.env.STORE_URL}/?success=1`,
            cancel_url:`${process.env.STORE_URL}/?success=0`,
            
            metadata:{
                orderId: order.id
            }
        })
        return NextResponse.json({url:session.url},{
            headers:corsHeaders
        })
    } catch (error) {
        return NextResponse.json({"Strip Error":error})
    }
}
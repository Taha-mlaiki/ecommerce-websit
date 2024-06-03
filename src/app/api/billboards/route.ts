import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../prisma/client";


export async function POST (req:NextRequest){
    const reqBody = await req.json();
    if(!reqBody.imageUrl) return NextResponse.json({error:"Image Required."},{status:400})
    try {
        const findBillboard = await db.billboard.findFirst({
            where:{
                label:reqBody.label,
                storeName:reqBody.storeName
            }
        })
        if(findBillboard) return NextResponse.json({error:"Billboard already exist in this store."},{status:409})
        
        const newBillboard =  await db.billboard.create({
            data:{
                store:{
                    connect:{name:reqBody.storeName}
                },
                label:reqBody.label,
                imageUrl: reqBody.imageUrl
            }
        })
        return NextResponse.json({success:"Billboard created.",billboard:newBillboard},{status:201})
    } catch (error) {
        return NextResponse.json({error:"Interval server Error"},{status:500})
    }
}
export async function GET(req:NextRequest){
    const reqBody = await req.json();
    try {
        const billboards = await db.billboard.findMany({
            where:{
                storeName: reqBody.storeName
            }
        })
        return NextResponse.json(billboards)
    } catch (error) {
        return NextResponse.json({error:"Interval server Error"},{status:500})
    }
}
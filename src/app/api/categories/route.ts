import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../prisma/client";


export async function POST (req:NextRequest){
    const reqBody = await req.json();
    try {
        const findCategory = await db.category.findFirst({
            where:{
                name:reqBody.name,
                billboardLabel: reqBody.billboardLabel,
                storeName: reqBody.storeName
            }
        })
        if(findCategory) return NextResponse.json({error:"Category already exist"},{status:409})
        
        const newCagtegory =  await db.category.create({
            data:{
                store:{
                    connect:{name:reqBody.storeName}
                },
                billboard:{
                    connect:{label:reqBody.billboardLabel}
                },
                name:reqBody.name,
            }
        })
        return NextResponse.json({success:"Category created.",category:newCagtegory},{status:201})
    } catch (error) {
        return NextResponse.json({error:"Interval server Error"},{status:500})
    }
}
export async function GET(req:NextRequest){
    const reqBody = await req.json();
    try {
        const categories = await db.category.findMany({
            where:{
                storeName: reqBody.storeName,
            }
        })
        return NextResponse.json(categories)
    } catch (error) {
        return NextResponse.json({error:"Interval server Error"},{status:500})
    }
}
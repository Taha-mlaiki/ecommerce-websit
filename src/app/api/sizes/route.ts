import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../prisma/client";


export async function POST (req:NextRequest){
    const reqBody = await req.json();
    try {
        const findCategory = await db.size.findFirst({
            where:{
                name:reqBody.name,
                storeName: reqBody.storeName
            }
        })
        if(findCategory) return NextResponse.json({error:"Size already exist"},{status:409})
        
        const newSize =  await db.size.create({
            data:{
                store:{
                    connect:{name:reqBody.storeName}
                },
                name:reqBody.name,
                value:reqBody.value
            }
        })
        return NextResponse.json({success:"Size created.",size:newSize},{status:201})
    } catch (error) {
        return NextResponse.json({error:"Interval server Error"},{status:500})
    }
}

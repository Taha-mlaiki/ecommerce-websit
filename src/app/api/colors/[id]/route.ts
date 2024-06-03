import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../prisma/client";



export async function PATCH(req:NextRequest,{params}:{params:{id:string}}){
    try {
        const reqBody = await req.json();
        const findCategory = await db.color.findUnique({
            where:{
                id:params.id
            }
        })
        if(!findCategory) return NextResponse.json({error:"Color not found."},{status:404})
        const newSize = await db.color.update({
            where:{
                id:params.id
            },
            data:{
                name:reqBody.name,
                value:reqBody.value
            }
        })
        return NextResponse.json({success:"Color Updated.",size:newSize},{status:200})
    } catch (error) {
        return NextResponse.json({error:"Interval server Error"},{status:500})
    }
}
export async function DELETE(req:NextRequest,{params}:{params:{id:string}}){
    try {
        const findColor = await db.color.findUnique({
            where:{
                id:params.id
            },
            include:{
                products:true
            }
        })
        if(!findColor) return NextResponse.json({error:"Color not found"},{status:404})
        if(findColor.products.length >= 1) return NextResponse.json({error:"Make sure you remove all products using this color first"},{status:409})
        await db.color.delete({
            where:{
                id:params.id
            }
        })
        return NextResponse.json({success:"Color Deleted"},{status:200})
    } catch (error) {
        return NextResponse.json({error:"Interval server Error"},{status:500})
    }
}
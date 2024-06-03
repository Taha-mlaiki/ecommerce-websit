import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../prisma/client";



export async function PATCH(req:NextRequest,{params}:{params:{id:string}}){
    try {
        const reqBody = await req.json();
        const findCategory = await db.size.findUnique({
            where:{
                id:params.id
            }
        })
        if(!findCategory) return NextResponse.json({error:"Size not found."},{status:404})
        const newSize = await db.size.update({
            where:{
                id:params.id
            },
            data:{
                name:reqBody.name,
                value:reqBody.value
            }
        })
        return NextResponse.json({success:"Size Updated.",size:newSize},{status:200})
    } catch (error) {
        return NextResponse.json({error:"Interval server Error"},{status:500})
    }
}
export async function DELETE(req:NextRequest,{params}:{params:{id:string}}){
    try {
        const {id} = params
        const findSize = await db.size.findUnique({
            where:{
                id
            },
            include:{
                Product:true
            }
        })
        if(!findSize) return NextResponse.json({error:"Size not found"},{status:404})
        if(findSize.Product.length >= 1) return NextResponse.json({error:"Make sure you remove all products using this size first."}
            , {status:409}
        )        
        await db.size.delete({
            where:{
                id
            }
        })
        return NextResponse.json({success:"Size Deleted"},{status:200})
    } catch (error) {
        return NextResponse.json({error:"Interval server Error"},{status:500})
    }
}
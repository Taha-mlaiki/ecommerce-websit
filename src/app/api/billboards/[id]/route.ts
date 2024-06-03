import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../prisma/client";



export async function PATCH(req:NextRequest,{params}:{params:{id:string}}){
    try {
        const reqBody = await req.json();
        const { id } = params
        if(!reqBody.imageUrl) return NextResponse.json({error:"Image Required."},{status:400})
        const findBillboard = await db.billboard.findUnique({
            where:{
                id
            }
        })
        if(!findBillboard) return NextResponse.json({error:"Billboard not found"},{status:404})
        const newBillBoard = await db.billboard.update({
            where:{
                id
            },
            data:{
                ...reqBody
            }
        })
        return NextResponse.json({success:"Billboard Updated Successfully",billboard:newBillBoard},{status:200})
    } catch (error) {
        return NextResponse.json({error:"Interval server Error"},{status:500})
    }
}
export async function DELETE(req:NextRequest,{params}:{params:{id:string}}){
    const reqBody = await req.json();
    try {
        const findBillboard = await db.billboard.findUnique({
            where:{
                label: reqBody.label
            }
        })
        if(!findBillboard) return NextResponse.json({error:"Billboard not found"},{status:404})
        await db.billboard.delete({
            where:{
                id: params.id
            }
        })
        return NextResponse.json({success:"Billboard Deleted Successfully"},{status:200})
    } catch (error) {
        return NextResponse.json({error:"Interval server Error"},{status:500})
    }
}
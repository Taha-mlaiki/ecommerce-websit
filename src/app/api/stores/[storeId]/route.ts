import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../prisma/client";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { storeId: string } }
) {
  try {
    const reqBody = await req.json();
    if (!reqBody)
      return NextResponse.json({ error: "Data Required!" }, { status: 400 });
   const store = await db.store.update({
      where: {
        id: params.storeId,
      },
      data: reqBody,
    });
    return NextResponse.json(
      
      { success: "Store updated Successfully!",store },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Interval server Error" },
      { status: 500 }
    );
  }
}
export async function DELETE(
    req:NextRequest ,
  { params }: { params: { storeId: string } }
) {
  try {
    console.log(params.storeId)
    const checkStore = await db.store.findUnique({
      where:{
        id: params.storeId
      },
      include:{
        billboards:true
      }
    })
    return NextResponse.json(
      { success: "Store deleted Successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Interval server Error" },
      { status: 500 }
    );
  }
}

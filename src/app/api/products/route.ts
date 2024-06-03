import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../prisma/client";

export async function POST(req: NextRequest) {
  const reqBody = await req.json();
  const {
    name,
    price,
    isFeatured,
    isArchived,
    imagesUrl:images,
  } = reqBody;
  console.log(reqBody)
  try {
    if (!images)
      return NextResponse.json(
        { error: "Images Are required" },
        { status: 400 }
      );
        await db.product.create({
      data: {
        name,
        price,
        isFeatured,
        isArchived,
        images,
        size: {
          connect: { id: reqBody.sizeId },
        },
        category: {
          connect: { id: reqBody.categoryId  },
        },
        color: {
          connect: { id: reqBody.colorId },
        },
        store: {
          connect: { name: reqBody.storeName },
        },
      },
    });
    return NextResponse.json({success:"Product Created."},{status:201})
  } catch (error) {
    return NextResponse.json({error:"Interval server Error"},{status:500})
  }
}

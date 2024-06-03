import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../prisma/client";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const reqBody = await req.json();
    const {
      name,
      price,
      isFeatured,
      isArchived,
      imagesUrl:images,
      storeName,
      categoryId,
      sizeId,
      colorId
    } = reqBody;
    if(!images) return NextResponse.json({error:"Images Are required."},{status:400})
    const findProduct = await db.product.findUnique({
      where: {
        id: params.id,
      },
    });
    if (!findProduct)
      return NextResponse.json(
        { error: "Product not found." },
        { status: 404 }
      );
      const updatedProduct = await db.product.update({
        where: { id:params.id },
        data: {
          name,
          price,
          isFeatured,
          isArchived,
          images,
          store: {
            connect: { name: storeName },
          },
          category: {
            connect: { id: categoryId },
          },
          size: {
            connect: { id: sizeId },
          },
          color: {
            connect: { id: colorId },
          },
        },
      });
    return NextResponse.json(
      { success: "Product Updated.", product: updatedProduct },
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
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const findProduct = await db.product.findUnique({
      where: {
        id: params.id,
      },
    });
    if (!findProduct)
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    await db.product.delete({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json({ success: "Product Deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Interval server Error" },
      { status: 500 }
    );
  }
}

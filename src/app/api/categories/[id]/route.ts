import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../prisma/client";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const reqBody = await req.json();
    const findCategory = await db.category.findUnique({
      where: {
        id: params.id,
      },
    });
    if (!findCategory)
      return NextResponse.json(
        { error: "Category not found." },
        { status: 404 }
      );
    const newCategory = await db.category.update({
      where: {
        id: params.id,
      },
      data: {
        name: reqBody.name,
        billboardLabel: reqBody.billboardLabel,
      },
    });
    return NextResponse.json(
      { success: "Category Updated.", category: newCategory },
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
  const reqBody = await req.json();
  console.log(params);
  try {
    const findCategory = await db.category.findUnique({
      where: {
        id: params.id,
      },
      include: {
        products: true,
      },
    });
    if (!findCategory)
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    if (findCategory.products.length >= 1)
      return NextResponse.json(
        { error: "Make sure you remove all products using this category first." },
        { status: 409 }
      );
    await db.category.delete({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json({ success: "Category Deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Interval server Error" },
      { status: 500 }
    );
  }
}

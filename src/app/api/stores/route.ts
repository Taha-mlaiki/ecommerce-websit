import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../prisma/client";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    console.log(reqBody);
    const { name } = reqBody;
    if (!name)
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    const existStore = await db.store.findUnique({
      where: { name },
    });
    if (existStore)
      return NextResponse.json(
        { error: "Store with this name Already exist!" },
        { status: 409 }
      );
    const store = await db.store.create({
      data: {
        name,
      },
    });
    return NextResponse.json({success:"Store Created Successfully",store},{status:201})
  } catch (error) {
    console.log("[STORES_POST]", error);
    return NextResponse.json({ error: "Interval error" }, { status: 500 });
  }
}

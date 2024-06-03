import { getResetTokenByToken } from "@/data/resetPassword";
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../prisma/client";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const reqBody = await req.json();
  const { newPassword, token } = reqBody;
  console.log(reqBody);
  try {
    const findToken = await getResetTokenByToken(token);
    if (!findToken || new Date(findToken.expires) < new Date()) {
      return NextResponse.json(
        { error: "Token has Expired,try again" },
        { status: 404 }
      );
    }
    const user = await db.user.findUnique({
      where: {
        email: findToken.email,
      },
    });
    if (!user)
      return NextResponse.json({ error: "Email Not found" }, { status: 404 });
    const hashedPwd = await bcrypt.hash(newPassword, 10);
    await db.user.update({
      where: {
        email: findToken.email,
      },
      data: {
        password: hashedPwd,
      },
    });
    await db.resetPassword.deleteMany({
      where: {
        email: findToken.email,
      },
    });
    return NextResponse.json(
      { success: "Password changed Successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Somthing Went Wrong" }, { status: 500 });
  }
}

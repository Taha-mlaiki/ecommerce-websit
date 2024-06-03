import { getVerificationTokenByToken } from "@/data/verification-token";
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../prisma/client";

export async function POST(req: NextRequest) {
  const reqBody = await req.json();
  const { token } = reqBody;
  const findToken = await getVerificationTokenByToken(token);
  if (!findToken || new Date(findToken?.expires) < new Date()) {
    return NextResponse.json(
      { error: "Token has Expired , try again" },
      { status: 404 }
    );
  }
  if (findToken) {
    try {
      await db.user.update({
        where: {
          email: findToken.email,
        },
        data: {
          emailVerified: new Date(),
        },
      });
      await db.verificationToken.deleteMany({
        where: {
          id: findToken.id,
        },
      });
      return NextResponse.json({ success: "Email Verified" }, { status: 201 });
    } catch (error) {
      NextResponse.json({ error: "Somthing Went Wrong" }, { status: 500 });
    }
  }
  NextResponse.json({ error: "Somthing Went Wrong" }, { status: 500 });
}

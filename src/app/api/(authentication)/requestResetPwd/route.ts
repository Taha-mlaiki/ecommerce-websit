import { NextRequest, NextResponse } from "next/server";
import { generateResetToken } from "@/data/resetPassword";
import { sendPwdResetEmail } from "@/lib/sendResetReq";
import { db } from "../../../../../prisma/client";

export async function POST(req: NextRequest) {
  const reqBody = await req.json();
  const { email } = reqBody;
  const user = await db.user.findUnique({
    where: {
      email: email,
    },
  });
  // check email
  if (!user)
    return NextResponse.json(
      { error: "No user found with this email" },
      { status: 404 }
    );

  try {
    //  generate token and send email
    const token = await generateResetToken(email);
    if (!token)
      return NextResponse.json({ error: "No email found" }, { status: 404 });
    await sendPwdResetEmail(email, token.token);
    return NextResponse.json({ success: "Reset email sent!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: "Somthing Went Wrong" },
      { status: 500 }
    );
  }
}

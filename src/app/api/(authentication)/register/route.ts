import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";
import { db } from "../../../../../prisma/client";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { generateVerificationToken } from "@/data/verification-token";
import { sendEmailTo } from "@/lib/sendEmail";

const registerSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(5, {
    message: "Password must at least contains 5 charachter",
  }),
});

export async function POST(req: NextRequest) {
  const reqBody = await req.json();
  const validateData = registerSchema.safeParse(reqBody);
  if (!validateData.success)
    return NextResponse.json({ error: "Invalid Credentials" }, { status: 400 });
  const findUser = await db.user.findUnique({
    where: {
      email: reqBody.email,
    },
  });
  if (findUser)
    return NextResponse.json({ error: "Email already used" }, { status: 409 });
  const hashedPwd = await bcrypt.hash(reqBody.password, 10);

  try {
    const data = {
      name: `${reqBody.firstName} ${reqBody.lastName}`,
      email: reqBody.email,
      password: hashedPwd,
    };
    await db.user.create({
      data,
    });
    const token = await generateVerificationToken(reqBody.email);
    await sendEmailTo(reqBody.email, token.token);
    return NextResponse.json(
      { success: "Email verification sent , check your email" },
      { status: 200 }
    );
  } catch (error) {
    console.log("register error", error);
    return NextResponse.json({ error: "Somthing Went Wrong" }, { status: 500 });
  }
}

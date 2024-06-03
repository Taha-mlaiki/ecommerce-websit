import * as z from "zod";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../prisma/client";
import { generateVerificationToken } from "@/data/verification-token";
import { sendEmailTo } from "@/lib/sendEmail";
import bcrypt from "bcryptjs";
const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5, {
    message: "Password must at least contains 5 charachter",
  }),
});

export async function POST(req: NextRequest) {
  const reqBody = await req.json();
  const validateData = LoginSchema.safeParse(reqBody);
  if (!validateData)
    return NextResponse.json({ error: "Invalid fields" }, { status: 401 });

  const existingUser = await db.user.findUnique({
    where: {
      email: reqBody.email,
    },
  });
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return NextResponse.json(
      { error: "Email does not Exist" },
      { status: 401 }
    );
  }
  const passwordMatch = await bcrypt.compare(
    reqBody.password,
    existingUser.password
  );
  if (!passwordMatch)
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  if (!existingUser.emailVerified) {
    const token = await generateVerificationToken(existingUser.email);
    await sendEmailTo(existingUser.email, token.token);
    return NextResponse.json(
      { success: "Confirmation email sent!" },
      { status: 201 }
    );
  }

  try {
    await signIn("credentials", {
      email: reqBody.email,
      password: reqBody.password,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return NextResponse.json(
            { error: "Invalid Credentials" },
            { status: 401 }
          );
        default:
          return NextResponse.json(
            { error: "Somthing Went Wrong" },
            { status: 500 }
          );
      }
    }
  }
  return NextResponse.json(
    { success: "Logged In Successfully" },
    { status: 200 }
  );
}

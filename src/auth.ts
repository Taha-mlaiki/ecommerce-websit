import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "../prisma/client";
import bcrypt from "bcryptjs";
import { User } from "@prisma/client";


export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Google,
    Github,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) return null;
        const user = await db.user.findUnique({
          where: {
            //@ts-ignore
            email: credentials.email,
          },
        });
        if (user && user.password) {
          const passwordMatch = bcrypt.compareSync(
            //@ts-ignore
            credentials.password!,
            user?.password
          );
          if (!passwordMatch) return null;
          return user
          
        };
        return null
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks:{
    async signIn({user,account}){
      // Allow OAuth without email verification
      if(account?.provider !== "credentials") return true
      const existUser = await db.user.findUnique({
        where:{
          id:user.id
        }
      })
      // Prevent Sign in without email verification
      if(!existUser?.emailVerified) return false
      return true
    },  
    //@ts-ignore
    async jwt({user,token}:{user:User,token:any}){
      if(user && user.role){
        return {
          ...token,
          role:user.role
        }
      }
      return token
    },
    async session({token,session}){
      if(token.sub && session.user){
        return {
          ...session,
          user:{
            ...session.user,
            role:token.role,
            id:token.sub
          }
        }
      }
      return session
    }
  },
  events:{
    async linkAccount({user}){
      await db.user.update({
        where:{
          id:user.id
        },
        data:{
          emailVerified : new Date()
        }
      })
    }
  },
  pages:{
    signIn:"/login",
    error:"/error"
  }
});

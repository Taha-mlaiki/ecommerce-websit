"use server"
import {v4 as uuidv4} from "uuid"
import { db } from "../../prisma/client"

export const getResetTokenByToken = async (token:string)=>{
    const findToken = await db.resetPassword.findUnique({
        where:{
            token
        }
    })
    if(findToken) return findToken
    return null
}

export const generateResetToken = async (email:string)=>{
    const token = uuidv4()
    const expires = new Date(new Date().getTime() + 3600 * 1000) 
    const resetToken = await db.resetPassword.create({
        data:{
            token,
            expires,
            email
        }
    })
    if(resetToken) return resetToken
    return null
}


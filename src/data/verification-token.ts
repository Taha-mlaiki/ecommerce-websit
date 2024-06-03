import { db } from "../../prisma/client";
import {v4 as uuidv4} from "uuid"

export const getVerificationTokenByEmail = async(email:string)=>{
    try {
        const verificationToken = db.verificationToken.findFirst({
            where:{
                email
            }
        })
        return verificationToken
    } catch (error) {
        return null
    }
}
export const getVerificationTokenByToken = async(token:string)=>{
    try {
        const verificationToken = db.verificationToken.findUnique({
            where:{
                token
            }
        })
        return verificationToken
    } catch (error) {
        return null
    }
}

export const generateVerificationToken = async (email:string)=>{
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 310000 * 60)
    const exsitingToken = await getVerificationTokenByEmail(email)
    if(exsitingToken){
        await db.verificationToken.delete({
            where:{
                id:exsitingToken.id
            }
        })
    }
    const verificationToken = await db.verificationToken.create({
        data:{
            token,
            email,
            expires
        }
    })
    return verificationToken
}
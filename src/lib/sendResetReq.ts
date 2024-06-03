import { Resend } from "resend"
const resend = new Resend(process.env.RESEND_API_KEY)


export const sendPwdResetEmail = async(email:string,token:string)=>{
    await resend.emails.send({
        from:"onboarding@resend.dev",
        to:email,
        subject:"Reset your Password",
        html:`<div>
        Reset Password
        <a href=http://localhost:3000/resetPassword?token=${token}>here</a>
        to reset password
        </div>`,
    })
}
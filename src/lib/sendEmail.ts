import { Resend } from "resend"
const resend = new Resend(process.env.RESEND_API_KEY)


export const sendEmailTo = async(email:string,token:string)=>{
    await resend.emails.send({
        from:"onboarding@resend.dev",
        to:email,
        subject:"Confirm your Email",
        html:`<div>
        Email Verification
        <a href=http://localhost:3000/new-verification?token=${token}>here</a>
        to Confirm email
        </div>`,
    })
}
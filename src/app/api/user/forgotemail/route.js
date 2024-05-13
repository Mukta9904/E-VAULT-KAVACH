import { connection } from "@/dbConfig/config";
import{ User }from "@/models/userModel";
import { NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";

connection()

export async function POST(request){
  try {
    const reqBody = await request.json()
    const {email}= reqBody
    const user = await User.findOne({email: email})
    console.log(user);
    if(!user){
        return NextResponse.json({message:"Invalid email"},{status: 400} )
    }
    await sendEmail({email: email, emailType: 'RESET', userId : user.id})
    return NextResponse.json({message:"Email send"},{success: true})
  } catch (error) {
    return NextResponse.json({error:error.message}, {status:500})
  }
}
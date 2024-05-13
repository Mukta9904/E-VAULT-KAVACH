import { connection } from "@/dbConfig/config";
import {User} from "@/models/userModel";
import { NextResponse } from "next/server";

connection()

export async function POST(request){
  try {
    const reqBody = await request.json()
    const {token}= reqBody
    const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt:Date.now()}})
    if(!user){
        return NextResponse.json({error:"Invalid token", data: token},{status: 400} )
    }
    user.verifyToken = undefined
    user.verifyTokenExpiry = undefined
    user.isVerified = true

    await user.save()
    return NextResponse.json({message:"User verified successfully"},{success: true})
  } catch (error) {
    return NextResponse.json({error:error.message}, {status:500})
  }
}
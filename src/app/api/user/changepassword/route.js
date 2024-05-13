import { connection } from "@/dbConfig/config";
import {User} from "@/models/userModel";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'

connection()

export async function POST(request){
    try {
        const reqBody = await request.json()
        const {token, newPassword }= reqBody
        const user = await User.findOne({forgotToken: token, forgotTokenExpiry: {$gt:Date.now()}})
        if(!user){
            return NextResponse.json({error:"Invalid token", data: token},{status: 400} )
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt)
        user.password = hashedPassword
        user.forgotToken = undefined
        user.forgotTokenExpiry = undefined
        await user.save()
        return NextResponse.json({message:"Password changed successfully"},{success: true})
      } catch (error) {
        return NextResponse.json({error:error.message}, {status:500})
      }
    
}
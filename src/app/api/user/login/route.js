import { connection } from "@/dbConfig/config";
import {User , KeyFolder} from "@/models/userModel";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import { decryptPassword } from "@/helpers/decryptPassword";

connection()
export async function POST(request){
  try {
    const reqBody = await request.json()
    const {email,password} = reqBody
    const user = await User.findOne({email})
    
    if(!user){
        return NextResponse.json({message: "Email doesn't exist"}, {status:400})
    }   
        const keyFolderData = await KeyFolder.findOne({userId: user._id})
        const savedPassword =  decryptPassword( user.password, keyFolderData.key, keyFolderData.iv)
        if(savedPassword !== password){
          return NextResponse.json({message: "Incorrect password"}, {status:400})
      } 
       const tokenData = {
        id : user._id,
        username: user.username,
        email: user.email
       }
         const token = jwt.sign( tokenData , process.env.JWT_SECRET, { expiresIn: "2h" })
         const response = NextResponse.json({message:"User logged in"}, {success:true})
         response.cookies.set("token", token,{
            httpOnly: true
         })
         return response       
    
  } catch (error) {
    return NextResponse.json({
        error: error.message || 'An unknown error occurred'
    }, { status: 500 });
  }

}

import { connection } from "@/dbConfig/config";
import { PasswordFolder, KeyFolder } from "@/models/userModel"; // Corrected imports
import { NextResponse } from "next/server";
import { getTokenData } from "@/helpers/getToken";
import { decryptPassword } from "@/helpers/decryptPassword";
connection();

export async function GET(request) {
  try {
    const userId = request.userId
    const keyFolderData = await KeyFolder.findOne({userId: userId})
    if(!keyFolderData) 
         return NextResponse.json({message:"Key not found"}, {status:400})

    const passwordFolder =  await PasswordFolder.findOne({user: userId })
    let arr = new Array()
    if(passwordFolder.passwords.length !== -1){
        for (const iterator of passwordFolder.passwords) {
            let obj = {
                id: iterator._id.toString(),
                siteName: iterator.siteName,
                siteUrl : iterator.siteUrl,
                loginId: iterator.loginId,
                password : decryptPassword(iterator.password, keyFolderData.key, keyFolderData.iv)
            }
            arr.push(obj)
        }
        return NextResponse.json({data: arr})
    }
        return NextResponse.json({message: "No password found"})
  } catch (error) {
    console.error(error); // Log the error for debugging
    return NextResponse.json({
      error: error.message || 'An unknown error occurred',
    }, { status: 500 });
  }
}
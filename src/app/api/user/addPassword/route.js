import { connection } from "@/dbConfig/config";
import { PasswordFolder, KeyFolder } from "@/models/userModel"; // Corrected imports
import { NextResponse } from "next/server";
import { getTokenData } from "@/helpers/getToken";
import { encryptPassword } from "@/helpers/encryptPassword";

connection();

export async function POST(request) {
  try {
    const userId = await getTokenData(request)
    const reqBody = await request.json();
    const {  siteName,loginId, password, siteUrl  } = reqBody;
    const keyFolderData = await KeyFolder.findOne({userId: userId})

    if(!keyFolderData) return NextResponse.json({message:"Key not found"}, {status:400})
    
    const hashedPassword =  encryptPassword(password, keyFolderData.key, keyFolderData.iv)
    const passwordFolder =  await PasswordFolder.findOne({user: userId })
    const newPassword = {
        siteName: siteName , 
        loginId: loginId,
        password: hashedPassword,
        siteUrl: siteUrl ,
    }
    await passwordFolder.passwords.push(newPassword)
    await passwordFolder.save()
    return NextResponse.json({data:passwordFolder.passwords});

  } catch (error) {
    console.error(error); // Log the error for debugging
    return NextResponse.json({
      error: error.message || 'An unknown error occurred',
    }, { status: 500 });
  }
}
import { connection } from "@/dbConfig/config";
import { PasswordFolder, KeyFolder } from "@/models/userModel"; 
import { NextResponse } from "next/server";
import { getTokenData } from "@/helpers/getToken";
import { encryptPassword } from "@/helpers/encryptPassword";
import { ObjectId } from 'mongodb'; 

connection();

export async function PUT(request) {
  try {
    const userId = await getTokenData(request)
    const reqBody = await request.json();
    const { id, siteName, loginId, password , siteUrl } = reqBody;
    const keyFolderData = await KeyFolder.findOne({userId: userId})
    if(!keyFolderData) return NextResponse.json({message:"Key not found"}, {status:400})
    const encryptedPassword =  encryptPassword(password, keyFolderData.key, keyFolderData.iv)
    const passwordFolder =  await PasswordFolder.findOne({user: userId })
    const newPassword = {
        siteName:siteName ,
        siteUrl:siteUrl , 
        loginId: loginId,
        password :encryptedPassword
    }
    const objectId = typeof id === 'string' ? new ObjectId(id) : id; // we have to convert it first `
    const changeIdx = await passwordFolder.passwords.findIndex(p => p._id.equals(objectId)) 
    if (changeIdx === -1) {
      return NextResponse.json({ message: "Password entry not found" }, { status: 404 });
    }
    passwordFolder.passwords[changeIdx] = newPassword
    await passwordFolder.save()
    return NextResponse.json({data: passwordFolder.passwords});

  } catch (error) {
    console.error(error); 
    return NextResponse.json({
      error: error.message || 'An unknown error occurred',
    }, { status: 500 });
  }
} 
import { connection } from "@/dbConfig/config";
import { PasswordFolder } from "@/models/userModel"; 
import { NextResponse } from "next/server";
import { getTokenData } from "@/helpers/getToken";
import { ObjectId } from 'mongodb'; 
connection();

export async function DELETE(request) {
  try {
    const userId = request.userId
    const reqBody = await request.json();
    const { id } = reqBody;
    const passwordFolder =  await PasswordFolder.findOne({user: userId })
    const objectId = typeof id === 'string' ? new ObjectId(id) : id; // we have to convert it first `

    passwordFolder.passwords = await passwordFolder.passwords.filter(p => !p._id.equals(objectId)) 
    await passwordFolder.save()
    return NextResponse.json({data: passwordFolder.passwords},{message: "Deleted"});
  } catch (error) {
    console.error(error); // Log the error for debugging
    return NextResponse.json({
      error: error.message || 'An unknown error occurred',
    }, { status: 500 });
  }
} 
import { connection } from "@/dbConfig/config";
import { User, PasswordFolder, PaymentFolder, KeyFolder } from "@/models/userModel"; // Corrected imports
import { NextResponse } from "next/server";
import { encryptPassword } from "@/helpers/encryptPassword";
import { randomBytes } from "crypto";

connection();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email, username, password } = reqBody;
    const existingUser = await User.findOne({ email }); // Renamed to avoid confusion

    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }
    const key = randomBytes(32); // 256-bit key
    const iv = randomBytes(16);  // 16-byte IV
  const newPassword =  encryptPassword(password,key,iv)
   
    // Create a new user
    const newUser = new User({
      email,
      username,
      password: newPassword,
    });

    const userData = await newUser.save();

    // Create empty folders for the user after the user has been created
    const passwordFolder = new PasswordFolder({ user: userData._id, passwords: [] });
    const paymentFolder = new PaymentFolder({ user: userData._id, paymentCards: [] });

    // Save the folders
    const passwordFolderData = await passwordFolder.save();
    const paymentFolderData = await paymentFolder.save();

    // Update the user with references to the folders
    userData.passwordFolder = passwordFolderData._id;
    userData.paymentFolder = paymentFolderData._id;
    await userData.save(); // Save the updates to the user
    const newKey = new KeyFolder({
        userId : userData._id,
        key: key.toString('hex'), 
        iv: iv.toString('hex')
    })
     await newKey.save()
    // Verification mail
    // await sendEmail({ email, emailType: "VERIFY", userId: userData._id });

    return NextResponse.json({
      message: "User registered successfully",
      success: true,
      userData
    });

  } catch (error) {
    console.error(error); // Log the error for debugging
    return NextResponse.json({
      error: error.message || 'An unknown error occurred',
    }, { status: 500 });
  }
}

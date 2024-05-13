import { connection } from "@/dbConfig/config"; 
import { PaymentFolder } from "@/models/userModel"; 
import { NextResponse } from "next/server"; 
import { getTokenData } from "@/helpers/getToken"; 
import { ObjectId } from 'mongodb'; 
connection();

export async function DELETE(request) {
  try {
    const userId = await getTokenData(request)
    const reqBody = await request.json();
    const { id } = reqBody;
    const paymentFolder =  await PaymentFolder.findOne({user: userId })
    const objectId = typeof id === 'string' ? new ObjectId(id) : id; // we have to convert it first `

    paymentFolder.paymentCards = await paymentFolder.paymentCards.filter(p => !p._id.equals(objectId)) 
    await paymentFolder.save()
    return NextResponse.json({data: paymentFolder.paymentCards},{message: "Deleted"});
  } catch (error) {
    console.error(error); // Log the error for debugging
    return NextResponse.json({
      error: error.message || 'An unknown error occurred',
    }, { status: 500 });
  }
} 
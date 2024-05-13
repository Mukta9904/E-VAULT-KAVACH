import { connection } from "@/dbConfig/config"; 
import { PaymentFolder , KeyFolder } from "@/models/userModel"; 
import { NextResponse } from "next/server"; 
import { getTokenData } from "@/helpers/getToken"; 
import { encryptPassword } from "@/helpers/encryptPassword"; 

connection();

export async function POST(request) {
  try {
    const userId = await getTokenData(request)
    const reqBody = await request.json();
    const { cardTitle, cardNumber , expiryMonth , expiryYear, cvv, cardHolderName  } = reqBody;
    const keyFolderData = await KeyFolder.findOne({userId: userId})

    if(!keyFolderData) return NextResponse.json({message:"Key not found"}, {status:400})
    
    const paymentFolder =  await PaymentFolder.findOne({user: userId })
    const newPayment = {

        cardTitle: cardTitle,

        cardNumber: cardNumber, 

        expiryMonth: encryptPassword(expiryMonth, keyFolderData.key, keyFolderData.iv),

        expiryYear:  encryptPassword(expiryYear, keyFolderData.key, keyFolderData.iv), 

        cvv:  encryptPassword(cvv, keyFolderData.key, keyFolderData.iv), 

        cardHolderName: encryptPassword(cardHolderName, keyFolderData.key, keyFolderData.iv)

    }

    await paymentFolder.paymentCards.push(newPayment)
    await paymentFolder.save()
    return NextResponse.json({data:paymentFolder.paymentCards})
  } catch (error) {
    console.error(error) 
    return NextResponse.json({
      error: error.message || 'An unknown error occurred',
    }, { status: 500 })
  }
}

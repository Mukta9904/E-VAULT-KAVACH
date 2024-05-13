import { connection } from "@/dbConfig/config"; 
import { PaymentFolder , KeyFolder } from "@/models/userModel"; 
import { NextResponse } from "next/server"; 
import { getTokenData } from "@/helpers/getToken"; 
import { encryptPassword } from "@/helpers/encryptPassword"; 
import { ObjectId } from 'mongodb'; 

connection()

export async function PUT(request) {
    try {
      const userId = request.userId
      const reqBody = await request.json()
      const { id , cardTitle, cardNumber ,expiryMonth , expiryYear, cvv, cardHolderName  } = reqBody;
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

      const objectId = typeof id === 'string' ? new ObjectId(id) : id; // we have to convert it first `

      const changeIdx = await paymentFolder.paymentCards.findIndex(p => p._id.equals(objectId))

      if (changeIdx === -1) {
      return NextResponse.json({ message: "Payment entry not found" }, { status: 404 });
    }

      paymentFolder.paymentCards[changeIdx] = newPayment
      await paymentFolder.save()
      return NextResponse.json({data: paymentFolder.paymentCards})

    } catch (error) {
      console.error(error); 
      return NextResponse.json({
        error: error.message || 'An unknown error occurred',
      }, { status: 500 });
    }
  } 

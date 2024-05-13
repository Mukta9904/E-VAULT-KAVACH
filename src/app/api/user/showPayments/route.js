import { connection } from "@/dbConfig/config"; 
import { PaymentFolder , KeyFolder } from "@/models/userModel"; 
import { NextResponse } from "next/server"; 
import { getTokenData } from "@/helpers/getToken"; 
import { decryptPassword} from "@/helpers/decryptPassword";
connection();

export async function GET(request) {
    try {
      const userId = await getTokenData(request)
      const keyFolderData = await KeyFolder.findOne({userId: userId})
      if(!keyFolderData) 
           return NextResponse.json({message:"Key not found"}, {status:400})
  
      const paymentFolder =  await PaymentFolder.findOne({user: userId })
      let arr = new Array()
      if(paymentFolder.paymentCards.length !== -1){
          for (const iterator of paymentFolder.paymentCards) {
              let  obj = {
                
                id: iterator._id,

                cardTitle: iterator.cardTitle,
        
                cardNumber: iterator.cardNumber, 
        
                expiryMonth: decryptPassword(iterator.expiryMonth, keyFolderData.key, keyFolderData.iv), 
                
                expiryYear: decryptPassword(iterator.expiryYear, keyFolderData.key, keyFolderData.iv), 
        
                cvv:  decryptPassword(iterator.cvv, keyFolderData.key, keyFolderData.iv), 
        
                cardHolderName: decryptPassword(iterator.cardHolderName, keyFolderData.key, keyFolderData.iv)
        
            }
              arr.push(obj)
          }
          return NextResponse.json({data: arr})
      }
      console.log(arr);
          return NextResponse.json({message: "No password found"})
    } catch (error) {
      console.error(error); // Log the error for debugging
      return NextResponse.json({
        error: error.message || 'An unknown error occurred',
      }, { status: 500 });
    }
  }
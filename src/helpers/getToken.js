import { connection } from "@/dbConfig/config";
import jwt from 'jsonwebtoken'

connection()

export function getTokenData(request){
  try {
    const token = request.cookies.get("token")?.value || "" 
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    console.log(decodedToken);
    return decodedToken.id
  } catch (error) {
    throw new Error(error.message)
  }
}
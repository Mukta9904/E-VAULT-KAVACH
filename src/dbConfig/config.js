import mongoose from "mongoose";

export async function connection(){

    try {
       await mongoose.connect(process.env.MONGO_URI)
        const connection = mongoose.connection
        connection.on('connected', () => console.log(`MongoDB Connected successfully`))
        connection.on('error',(err)=>{
            console.log('Connection to db was failed', err);
            process.exit()
        })
        
    } catch (error) {
        console.log("Error in db connection", error);
    }
}
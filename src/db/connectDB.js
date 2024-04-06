import { config } from "dotenv";
import mongoose from "mongoose";

config()
const PORT = process.env.PORT
const mongoURI=`mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@hamburgueria.hee7tma.mongodb.net/
`

async function connectDB (){
    try{
        await mongoose.connect(mongoURI)
        console.log("conectado ao MongoDB")
    }catch(error){
        console.log(error)
    }
}


export default connectDB
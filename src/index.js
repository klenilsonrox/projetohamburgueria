import { config } from "dotenv"
import express from "express"
import cors from "cors"
import connectDB from "./db/connectDB.js"
config()
const PORT = process.env.PORT

const app = express()
app.use(express.json())
app.use(cors())




connectDB()



app.listen(PORT,()=>{
    console.log("servidor rodando na porta", PORT)
})
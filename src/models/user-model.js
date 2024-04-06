import { Schema, model } from "mongoose";



const userSchema = new Schema({
    name:{
        type:String,
    },
    email:{
        type:String
    },
    isAdmin:{
        Boolean,
        default:false
    }
})



const User= model("User", userSchema)

export default User
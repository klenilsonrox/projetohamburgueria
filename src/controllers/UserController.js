import User from "../models/user-model.js";

export const getUsers= async (req,res)=>{
    try{
        const users = await User.find()
        return res.status(200).json(users)
    }catch(error){
        return res.status(500).json({error:error.message})
    }
}

import { Message } from "../models/message.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";

// create an api to get all users except the token one 
export const getAlluser = async(req,res)=>{
     const token = req.user;
    const {id} = token;

   let uid = new mongoose.Types.ObjectId(id);
    try{
    const users = await User.find({ _id: { $ne:uid } }).select('-password -__v'); 
    if(users.length>0){
           return res.status(200).json({message: "All users fetched successfully", data:users, isSuccess: true}); 
    }  
    else{
        return res.status(404).json({ message: "No users found", isSuccess: false });
    }
    }catch(err){
        console.log(err);
        return res.status(500).json({ message: 'Server error' });
    }
}

export const getUserdetails = async(req,res)=>{
    const token = req.user;
    const {id} = token;
    const { rid }=req.body;
  try{
      const  getallmessages = await Message.find({sender:id,reciverid:rid});
      if(getallmessages.length>0){
          return res.status(200).json({message: "All messages fetched successfully", data:getallmessages, isSuccess: true});
        }
        else{
            return res.status(200).json({ message: "Start the chat", isSuccess: false });
        }

  }catch(err){

  }

}
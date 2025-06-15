import mongoose from "mongoose";

export const connectDb = async()=>{
    try{
      const conn = await mongoose.connect(process.env.MONGO_URI);
      if(conn){
        console.log(`Mongodb connected successfully`)
      }
    }catch(err){
        console.log(err);
        
    }

}

import axiosInstance from "./axiosInstance";


export const loginuser = async(payload)=>{
    try{
       let response = await axiosInstance.post('/auth/login', payload);
       return response.data;
    }catch(err){
        console.log(err);
    }
}

export const registeruser = async(payload)=>{
try{
 let response = await axiosInstance.post('/auth/register', payload);
 return response.data;

}catch(err){
    console.log(err);
}

}

export const getAlluser = async()=>{
    try{
       const response = await axiosInstance.get('/auth/alluser');
         return response.data;
    }catch(err){
        console.log(err);
    }
}
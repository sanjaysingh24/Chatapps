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

export const messages = async(rid)=>{
    try{
       const response = await axiosInstance.get(`/auth/getmessages/${rid}`);
       return response.data;
    }catch(err){
        console.log(err)
    }
}

export const authuser = async()=>{
    try{
       const response = await axiosInstance.get('/auth/authuser');
       return response.data;
    }catch(err){
        console.log(err);
    }
}

export const logoutuser  = async()=>{
    try{
         let res = await axiosInstance.post('/auth/logout');
         return res.data;
    }catch(err){
        console.log(err);
    }
}
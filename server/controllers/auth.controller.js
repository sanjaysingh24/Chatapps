import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
//implement file sharing 
export const registeruser = async(req,res)=>{
    const { username, email, password } = req.body;
    try{
 const userExists = await User.findOne({ email });
    if (userExists) return res.status(200).json({ message: "User already exists" ,isSuccess:false});

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hashedPassword });

    const token = jwt.sign({ user: { id: newUser._id } }, process.env.JWT_SECRET, { expiresIn: '1d' });

    return res.status(201).json({
        message: "User registered successfully",
        isSuccess: true
    });
    }catch(err){
        return res.status(500).json({ message: 'Server error',isSuccess: false });
    }
}

export const loginuser = async(req,res)=>{
    const { email, password } = req.body;
  try{
const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ user: { id: user._id } }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.cookie('token', token, {
    httpOnly:true,
    secure: true,
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000
  });
   return res.json({
      token,
      isSuccess: true,
      user:user?.username,
      id:user?._id,
      message: "User logged in successfully",
     
    });
  }catch(err){
 return res.status(500).json({ message: 'Server error' });
  }
}

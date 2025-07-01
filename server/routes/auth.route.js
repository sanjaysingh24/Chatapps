import express from 'express';
import { authuser, loginuser, logoutuser, registeruser } from '../controllers/auth.controller.js';
import { getAlluser, getmessages } from '../controllers/user.controller.js';
import authMiddleware from '../middleware/authmiddleware.js';
export const authrouter = express.Router();
  authrouter.post('/register',registeruser)
  .post('/login',loginuser)
  .get('/alluser',authMiddleware,getAlluser)
  .get('/getmessages/:rid',authMiddleware,getmessages)
  .get('/authuser',authuser)
  .post('/logout',authMiddleware,logoutuser)
import express from 'express';
import { loginuser, registeruser } from '../controllers/auth.controller.js';
import { getAlluser, getmessages } from '../controllers/user.controller.js';
import authMiddleware from '../middleware/authmiddleware.js';
export const authrouter = express.Router();
  authrouter.post('/register',registeruser)
  .post('/login',loginuser)
  .get('/alluser',authMiddleware,getAlluser)
  .get('/getmessages/:rid',authMiddleware,getmessages)
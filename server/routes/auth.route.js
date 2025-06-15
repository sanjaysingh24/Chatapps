import express from 'express';
import { loginuser, registeruser } from '../controllers/auth.controller.js';
export const authrouter = express.Router();
  authrouter.post('/register',registeruser)
  .post('/login',loginuser);
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import { authrouter } from './routes/auth.route.js';
import { connectDb } from './db/connect.js';
import { initializeSocket } from './socket/index.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    res.send('Welcome to the server!');
})
app.use('/api/auth',authrouter)
const server =  http.createServer(app);
//initialize socket server;
initializeSocket(server);
app.listen(PORT,(err)=>{
    connectDb();
    if(err)throw err;
    console.log(`Server is running on port ${PORT}`);
})
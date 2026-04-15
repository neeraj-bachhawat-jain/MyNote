import express from "express";
import mongoose from "mongoose";
import {URI, port} from './config.mjs';
import router from './src/routes/userRoutes.mjs';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors({
    origin: [
        "https://mynote-onq7.onrender.com"
    ]
}));
mongoose.connect(URI).then(()=>console.log("database connected successfully")
).catch((err)=>console.log(err)); 
app.use('/', router);
app.listen(port, ( )=>{
    console.log(`Server is started on  port ${port}`);
})

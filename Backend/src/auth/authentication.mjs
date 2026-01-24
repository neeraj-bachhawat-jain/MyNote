import jwt from 'jsonwebtoken';
import {secret_key} from '../../config.mjs';
import userModel from '../models/userModel.mjs';
const authentication = async (req, res, next)=>{
    try{
        let header = req.headers;
        let token = header.authorization && header.authorization.split(" ")[1]||false;
        if(!token){
            return res.status(400).send({status:"failed", message:"Please login to continue"});
        }
        jwt.verify(token, secret_key, (err, decoded)=>{
            if(err){
                return res.status(401).send({status:"failed", message:"Invalid token"});
            }else{
                req.token = decoded;
                next();
            }
        });
    }catch(error){
        if(error.name === 'JsonWebTokenError'){
            return res.status(401).send({status:"failed", message:"Invalid token"});
        }else{
            return res.status(500).send({status:"failed", message:"Internal server error"});
        }
    }
}
const authorization = async(req, res, next)=>{
    try{
        const token = req.token;
        const user = await userModel.findById(token.userId);
        if(!user){
            return res.status(400).send({status:"failed", message:"User not found"});
        }
        next();
    }catch(error){
        return res.status(500).send({status:"failed", message:"Internal server error"});
    }
}

export {authentication, authorization};
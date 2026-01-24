import bcrypt from 'bcrypt'
import userModel from '../models/userModel.mjs';
import jwt from 'jsonwebtoken';
import {secret_key} from '../../config.mjs';
const registerUser = async (req, res)=>{
    try{
        let {firstname, lastname, userEmail, password, phoneNumber} = req.body;
        if(!firstname){
            return res.status(400).send({status:"failed", message:"First name is required"});
        }
        if(!lastname){
            return res.status(400).send({status:"failed", message:"Last name is required"});
        }
        if(!userEmail){
            return res.status(400).send({status:"failed", message:"Email is required"});
        }
        if(!phoneNumber){
            return res.status(400).send({status:"failed", message:"Phone is required"});
        }
        if(!password){
            return res.status(400).send({status:"failed", message:"Password name is required"});
        }
        password = await bcrypt.hash(password, 10);
        await userModel.create({firstname, lastname, userEmail, password, phoneNumber});
        return res.status(201).send({status:"ok", message:"User registered successfully"});
    }catch(error){
        if(error.message.includes('validation')){
            return res.status(400).send({status:"failed", message:error.message});
        }else if(error.message.includes('duplicate')){
            return res.status(400).send({status:"failed", message:"Email already exists"});
        }else{
            return res.status(500).send({status:"failed", message:"Internal server error"});
        }
    }
} 

const loginUser = async (req, res)=>{
    try{
        const {userEmail, password} = req.body;
        const user = await userModel.findOne({userEmail: userEmail});
        if(!user){
            return res.status(400).send({status:"failed", message:"Invalid email or password"});
        }
        let hashedPassword = user.password;
        let isPasswordMatch = await bcrypt.compare(password, hashedPassword);
        if(!isPasswordMatch){
            return res.status(400).send({status:"failed", message:"Invalid email or password"});
        }
        let token = jwt.sign({userId: user._id}, secret_key, {expiresIn: '1h'});
        if(!token){
            return res.status(500).send({status:"failed", message:"Could not generate token"});
        }
        let data = {id: user._id, firstname: user.firstname, lastname: user.lastname, email: user.userEmail, phone: user.phoneNumber, token: token};
        return res.status(200).send({status:"ok", data: data});
    }catch(error){
        return res.status(500).send({status:"failed", message:"Internal server error"});
    }
}
const updatedUser = async (req, res) => {
  try {
    const userId = req.token.userId;

    const { firstname, lastname, phoneNumber } = req.body;

    const updatedData = await userModel.findByIdAndUpdate(
      userId,
      { firstname, lastname, phoneNumber },
      { new: true }
    );

    return res.status(200).send({
      status: "ok",
      message: "User updated successfully",
      data: updatedData
    });
  } catch (error) {
    return res.status(500).send({
      status: "failed",
      message: "Internal server error"
    });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).send({ status: "failed", message: "User not found" });
    }
    return res.status(200).send({
      status: "ok",
      data: user
    });
  } catch (error) {
    return res.status(500).send({
      status: "failed",
      message: "Internal server error"
    });
  }
};

export {registerUser, loginUser, updatedUser, getUserProfile};
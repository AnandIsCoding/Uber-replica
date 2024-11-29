import mongoose from "mongoose";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import userModel from "../models/user.model.js";
import jwt from 'jsonwebtoken'

export const userSignupController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array().map((err) => ({
          field: err.param,
          message: err.msg,
        })),
      });
    }

    const { fullName, email, password } = req.body;

    const { firstName, lastName } = fullName;

    if (!firstName || !lastName || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    //check if user already registered
    const userAlreadyregistered = await userModel.findOne({ email: email });
    if (userAlreadyregistered)
      return res
        .status(403)
        .json({ success: false, message: "User already registered" });

    //hash the password
    const encryptedPassword = await bcrypt.hash(password, 10);
    // Log first name and last name for debugging
    console.log(`Creating user: ${firstName} ${lastName}`);
    // create user save entry in db
    await userModel.create({
      fullName: {
        firstName,
        lastName,
      },
      email,
      password: encryptedPassword,
    });

    return res
      .status(200)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", success: false });
    console.log("Error is signup " + error);
  }
};

export const userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "email and password are required" });

    const userAvailable = await userModel.findOne({ email: email });
    if (!userAvailable)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });

    //compare password with user's hashed password
    
    const isMatching = await bcrypt.compare(password, userAvailable.password);
    if (!isMatching)
      return res
        .status(403)
        .json({ success: false, message: "Invalid credentials" });

    //create a jwt token nd add it to cookie, and send to user
    var token = jwt.sign({ _id: userAvailable._id }, process.env.PRIVATE_KEY, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "None",
      expires: new Date(Date.now() + 604800000),
    });
    return res.status(200).json({success: true, message: `Welcome back ${userAvailable.fullName.firstName} ${userAvailable.fullName.lastName}`, userAvailable, token});
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", success: false });
    console.error("login error ", error);
  }
};

export const userLogoutController = (req, res) => {
  try {
    res.cookie('token',null, { expires: new Date(Date.now()) })
    res.status(200).json({message:'User logged out successfully'})
  } catch (error) {
    res.status(500).json({success:false, message:'Internal Server Error'})
    console.error('Error in logging out user  => ',error)
  }
};


export const userProfileController = async(req,res) =>{
  try {
    const user = req.user
    if(!user) return res.status(401).json({success:false, message:'Unauthenticated user'})
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({success:false, message:'Internal Server Error'})
  }
}

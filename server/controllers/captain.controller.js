import captainModel from "../models/captain.model.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

export const captainSignupController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password, vehicle, location } = req.body;
    if (!fullName || !email || !password || !location || !vehicle) {
      return res
        .status(401)
        .json({ success: false, message: "all fields are required" });
    }
    //check user available with the entered email
    const captainAvailable = await captainModel.findOne({ email: email });
    if (captainAvailable)
      return res
        .status(409)
        .json({ success: false, message: "Captain already registered" });

    //hash the password
    const encryptedPassword = await bcrypt.hash(password, 10);
    //create captain

    await captainModel.create({
      fullName: {
        firstName: fullName.firstName,
        lastName: fullName.lastName,
      },
      email,
      password: encryptedPassword,
      vehicle: {
        color: vehicle.color,
        capacity: vehicle.capacity,
        plate: vehicle.plate,
        vehicleType: vehicle.vehicleType,
      },
      location: {
        latitude: location.latitude,
        longitude: location.longitude,
      },
    });

    res
      .status(200)
      .json({ success: true, message: "Captain registered successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
    console.error("Error in captain Signup =>> ", error);
  }
};

export const captainLoginController = async (req, res) => {
    try {
        const {email,password} = req.body
        if(!email ||!password) return res.status(400).json({ success: false, message: "email and password are required"})
        
            const captainAvailable = await captainModel.findOne({ email: email})
            if(!captainAvailable){
                return res.status(401).json({ success: false, message: "Invalid credentials email"})
            }

            const matchPassword = await bcrypt.compare(password, captainAvailable.password)
            if(!matchPassword) return res.status(401).json({ success: false, message: "Invalid credentials password"})
            //generate token and assign in cookies send to captain
            var token = jwt.sign({ _id: captainAvailable._id }, process.env.PRIVATE_KEY, {
                expiresIn: "7d",
              });
              res.cookie("token", token, {
                httpOnly: true,
                sameSite: "None",
                expires: new Date(Date.now() + 604800000),
              });
              return res.status(200).json({success: true, message: `Welcome back ${captainAvailable.fullName.firstName} ${captainAvailable.fullName.lastName}`});
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
        console.error(error)
    }
};

export const captainLogoutController = async(req,res) =>{
  try {
    res.cookie('token', null,  { expires: new Date(Date.now()) })
    res.status(200).json({message:'Captain logged out successfully'})
  } catch (error) {
    res.status(500).json({success: false, message: "Internal Server Error"})
    console.error('Error in logging out captain =>> ',error)
  }
}

export const captainProfileController = async(req,res) =>{
  try {
    const captain = req.captain
    if(!captain) return res.status(401).json({success: false, message:'Unauthenticated captain access'})
    res.status(200).json(captain)
  } catch (error) {
    res.status(500).json({success: false, message: "Internal Server Error"})
    console.error('Error in fetching captain profile =>> ',error)
  }
}

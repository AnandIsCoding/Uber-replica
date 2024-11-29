import jwt from 'jsonwebtoken'
import userModel from '../models/user.model.js';
export const userAuthorization = async(req,res,next) =>{
    try {
        const {token} = req.cookies
        if(!token) return res.status(401).json({success: false, message:'Unauthenticated user'})

        const decoded = await jwt.verify(token, process.env.PRIVATE_KEY);
        const userId = decoded._id
        const user = await userModel.findById(userId)
        if(!user) return res.status(404).json({success:false, message:'No user found'})
        req.user = user
        return next()

        
    } catch (error) {
        console.error('Error in user authorization middleware  => ', error)
    }
}
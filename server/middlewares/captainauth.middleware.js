import jwt from 'jsonwebtoken'
import captainModel from '../models/captain.model.js'
export const captainAuthentication = async(req, res, next) =>{
    try {
        const {token} = req.cookies
        if(!token) return res.status(401).json({success:false, message:'Unauthorized access'})
        const decoded = await jwt.verify(token, process.env.PRIVATE_KEY);
        const captainId = decoded._id
        const captain = await captainModel.findById(captainId)
        if(!captain) return res.status(404).json({success:false, message:'No captain found'})
        req.captain = captain
        return next()
    } catch (error) {
        res.status(500).json({success:false, message:'Internal Server Error'})
        console.error(error)
    }
}
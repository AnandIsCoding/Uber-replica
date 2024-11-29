import express from 'express'
import {body} from 'express-validator'
import {userSignupController, userLoginController, userLogoutController, userProfileController} from '../controllers/user.controller.js'
import { userAuthorization } from '../middlewares/userAuth.middlewares.js'
const userRouter = express.Router()

userRouter.post('/signup',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullName.firstName').isLength({ min: 2 }).withMessage('First name must be at least 2 characters long'),
    body('fullName.lastName').isLength({ min: 2 }).withMessage('First name must be at least 2 characters long'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
], userSignupController)

userRouter.post('/login',[ body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')], userLoginController)

userRouter.delete('/logout', userLogoutController )

userRouter.get('/profile', userAuthorization, userProfileController)

export default userRouter
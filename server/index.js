import dotenv from 'dotenv'
import connectToDatabase from './configs/database.js'
import express from 'express'
import userRouter from '../server/routes/user.routes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import captainRouter from './routes/captain.routes.js'

dotenv.config()
const app = express()
const PORT = process.env.SERVER_PORT || 4000


app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(express.json());

//userRoute
app.use('/api/v1/users', userRouter)
//captain router
app.use('/api/v1/captains', captainRouter)



// Connect to mongoDb and server start
connectToDatabase()
.then(()=>{
    console.log('database connection established')
    app.listen(PORT,()=>{
        console.log(`server is listening at http://localhost:${process.env.SERVER_PORT}`)
    })
})
.catch((error)=>{
    console.log('Database connection failed')
    console.log('databse connection error : ',error)
})

import dotenv from 'dotenv'
import connectToDatabase from './configs/database.js'
import express from 'express'
import userRouter from '../server/routes/user.routes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import captainRouter from './routes/captain.routes.js'
import path from 'path'

dotenv.config()
const app = express()
const PORT = process.env.SERVER_PORT || 4000
const _dirname = path.resolve()


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

app.use(express.static(path.join(_dirname, "/client/dist")))
app.get('*',(_,res)=>{
  res.sendFile(path.resolve(_dirname, "client", "dist", "index.html"))
})



// Connect to mongoDb and server start
connectToDatabase()
.then(()=>{
    console.log('database connection established')
    app.listen(PORT,()=>{
        console.log(`server is listening at http://localhost:${process.env.SERVER_PORT || 8000}`)
    })
})
.catch((error)=>{
    console.log('Database connection failed')
    console.log('databse connection error : ',error)
})

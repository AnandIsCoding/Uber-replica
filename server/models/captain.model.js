import mongoose from 'mongoose'

const captainSchema = mongoose.Schema({
    fullName:{
        firstName:{
            type:String,
            required:true,
            minlength:[2, 'First name must be atleast 2 characters long'],
            maxlength:[30, "First name can't be more than 2 characters long"],
        },
        lastName:{
            type:String,
            required:true,
            minlength:[2, 'Last name must be atleast 2 characters long'],
            maxlength:[30, "Last name can't be more than 2 characters long"],
        }
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:[8, 'Password must be at least 8 characters long'],
        unique:true
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'inactive'
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            minlength:[3, 'color must be at least 3 characters']
        },
        capacity:{
            type:Number,
            required:true,
            min:[1, 'Capacity must be at least 1']
        },
        plate:{
            type:String,
            required:true,
            minlength:[3, 'number plate must have atleast 3 digits']
        },
        vehicleType: {
            type: String,
            required: true,
            enum: [ 'auto', 'car' , 'bike' ],
        }
    },
    location:{
        latitude:{
            type:Number
        },
        longitude:{
            type:Number
        }
    },
    socketId:{
        type:String
    }
},{timeStamps:true})

const captainModel = mongoose.model('Captain', captainSchema)
export default captainModel
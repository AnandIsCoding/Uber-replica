import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  fullName: {
    firstName: {
      type: String,
      minlength: [2, 'First name must be at least 2 characters long'],
      maxlength: [30, 'First name cannot be more than 30 characters'],
      required: true,
    },
    lastName: {
      type: String,
      minlength: [2, 'Last name must be at least 2 characters long'],
      maxlength: [30, 'Last name cannot be more than 30 characters'],
      required: true,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [8, 'Password must be at least 8 characters long'],
  },
  socketId: {
    type: String,
  },
}, { timestamps: true });

const userModel = mongoose.model('User', userSchema);

export default userModel;

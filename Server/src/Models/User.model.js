import mongoose, { Mongoose } from "mongoose";

const userSchema = new mongoose.Schema({
    
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true
    },
    fullname: {
        type: String, 
    },
    email: {
        type: String,
        required: [true , "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isLoggedIn: {
        type: Boolean,
        default: false
    },
    token: {
        type: String,
        default: null
    },
    otp: {
        type: String,
        default: null
    },
    otpExpiry: {
        type: Date,
        default: null
    }
}, {timestamps: true});


const User = mongoose.model("user" , userSchema);

export default User;
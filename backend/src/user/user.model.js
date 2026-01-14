import { model, Schema } from "mongoose";


const userShema = new Schema({
    fullname: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    mobile: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: "user",
        enum: ['user']
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    otp: String,
    otpExpiry: Date,

}, { timestamps: true });


const UserModel = model('User', userShema);
export default UserModel;
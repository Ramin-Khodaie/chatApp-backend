import mongoose from "mongoose";
import { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser {
    userId:string,
    userName: string,
    phoneNumber: string,
    email: string,
    avatar?: string,
    password: string,
    confirmPassword: string
}

const userSchema = new Schema<IUser>({    
    userId:{
        type:String,
        required:true,
    },
    userName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    confirmPassword: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: false
    }
}, { timestamps: true })




const user = mongoose.model('user', userSchema);
export default user;
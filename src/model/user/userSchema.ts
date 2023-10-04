import mongoose, { Document, ObjectId } from "mongoose";
import { Schema } from 'mongoose';

export interface IUser extends Document {
    userId: string,
    userName: string,
    phoneNumber: string,
    email: string,
    avatar?: string,
    password: string,
    confirmPassword: string
}

const userSchema = new Schema({
    userId: {
        type: String,
        required: true,
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
    },
    refreshToken: {
        token: {
            type: String,
            default: "",
            maxlength: 500,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            required: true,
        },
    },
}, { timestamps: true })




const user = mongoose.model('user', userSchema);
export default user;
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter your name."]
    },
    email: {
        type: String,
        required: [true, "Please enter your email."],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter you password."]
    },
    avatar: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verifyToken: {
        type: String
    },
    verifyTokenExpire: {
        type: Date
    },
    forgotPasswordToken: {
        type: String
    },
    forgotPasswordTokenExpire: {
        type: Date
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
}, { timestamps: true });


const User = mongoose.models.users || mongoose.model("users", UserSchema);
export default User;
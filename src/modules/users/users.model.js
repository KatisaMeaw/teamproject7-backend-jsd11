import mongoose from "mongoose";

// a data model is create from a data schema

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },    
    email: { type: String, required: true, unique: true, lowercase: true },
    mobileNumber: { type: String, required: true, trim: true},
    dob: { type: Date, required: true},
    password: { type: String, required: true, minlength: 6, select: false },
    //
    nickName: { type: String, default: "" },
    gender: { type: String, enum: ["Male", "Female", "Other", ""], default: "" },
    country: { type: String, default: "" },
    language: { type: String, default: "" },
    timeZone: { type: String, default: "" },
    profileImage: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);


export const User = mongoose.model("User", userSchema)
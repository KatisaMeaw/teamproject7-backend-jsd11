import mongoose from "mongoose";

// a data model is create from a data schema

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },    
    email: { type: String, required: true, unique: true, lowercase: true },
    mobileNumber: { type: String, required: true, trim: true},
    dob: { type: Date, required: true},
    password: { type: String, required: true, minlength: 6, select: false },
    
  },
  {
    timestamps: true,
  }
);


export const User = mongoose.model("User", userSchema)
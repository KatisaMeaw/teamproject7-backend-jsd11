import mongoose from "mongoose";
import bcrypt from "bcrypt";

// a data model is create from a data schema

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    email: { type: String, required: true, unique: true, lowercase: true },
    mobileNumber: { type: String, required: true, trim: true },
    dob: { type: Date, required: true },
    password: { type: String, required: true, minlength: 6, select: false },
    //
    nickName: { type: String, default: "" },
    gender: { type: String, enum: ["Male", "Female"], default: "Other" },
    country: { type: String, default: "" },
    language: { type: String, default: "" },
    timeZone: { type: String, default: "" },
    profileImage: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

export const User = mongoose.model("User", userSchema);
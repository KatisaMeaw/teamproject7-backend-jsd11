import mongoose from "mongoose";

export async function connectDB(){
    const uri = process.env.MONGODB_URI

    try {
        await mongoose.connect(uri, {dbName: "R-RELIEF-teamproject7"});
        console.log("MongoDB connected 🟢");
    } catch (error) {
        console.error("MongoDB connection error! 🔴", error)
        process.exit(1);
    }


}
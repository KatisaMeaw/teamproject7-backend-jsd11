import mongoose from "mongoose";
import { Product } from "./src/modules/products/products.model.js";
import { products } from "./data.js";
import dotenv from "dotenv"

// โหลดค่าจาก .env
dotenv.config()
const MONGO_URI = process.env.MONGODB_URI
console.log("Check URI:", MONGO_URI);

const importData = async () => {
    try {
        //เชื่อมกับ MongoDB
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB Connected...");

        // ลบข้อมูลเก่าทิ้งก่อน
        await Product.deleteMany({});
        console.log("Data Destroyed(Cleared old data)...");

        // นำข้อมูลเข้า
        await Product.insertMany(products)
        console.log("Data Import Success!");

        process.exit();
    } catch(error){
        console.error("Error with data import:",error);
        process.exit(1); // จบการทำงานแบบมี Error
    }
};

importData();
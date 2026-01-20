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
        await mongoose.connect(MONGO_URI);
        await Product.deleteMany({});

        // Clean the data: remove "%" and "-" and convert to Number
        const cleanedProducts = products.map(item => ({
            ...item,
            discount: typeof item.discount === 'string' 
                ? Number(item.discount.replace(/[-%]/g, '')) 
                : item.discount
        }));

        await Product.insertMany(cleanedProducts);
        console.log("Data Import Success!");

        const count = await Product.countDocuments();
        console.log(`Success! Total products in database: ${count}`);
        
        process.exit();
    } catch(error){
        console.error("Error with data import:", error);
        process.exit(1);
    }
};

importData();
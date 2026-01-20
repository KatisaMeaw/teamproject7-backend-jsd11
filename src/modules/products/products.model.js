import mongoose from "mongoose";

// create schema
const productSchema = new mongoose.Schema(
    {
        
        name: {
            type: String,
            required: true, 
            trim: true,
        },
        category: {
            type: String,
            required: true, 
            enum: ['Ergonomic Chair', 'Table', 'Accessories']
        },
        image: {
            type: String,
            required: true, 
        },
        description: { 
            type: String,
            required: false, 
        },
        price: { 
            type: Number,
            required: true, 
        },
        originalPrice: {
            type: Number,
            required: false,
        },
        discount: {
            type: Number,
            required: false,
        },
    },
    { timestamps: true }
);

export const Product = mongoose.model('Product', productSchema);
// ส่งออกไปใช้งานชื่อ Product
// บอกให้ mongoose สร้าง medel ให้หน่อยโดยมี parameter 2 ตัว
// Product => parameter#1 Name of model
// productSchema =>parameter#2 กฏระเบียที่สร้างไว้ข้างขน

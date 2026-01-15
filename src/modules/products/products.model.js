import mongoose from "mongoose";

// create schema
const productSchema = new mongoose.Schema(
    {
        // ✅ แนะนำให้ลบฟิลด์ id: Number ทิ้งไปเลย เพราะเราจะใช้ _id ของ MongoDB
        name: {
            type: String,
            required: true, // เพิ่ม d
            trim: true,
        },
        category: {
            type: String,
            required: true, // เพิ่ม d
            enum: ['Ergonomic Chair', 'Table', 'Accessories'] 
        },
        image: {
            type: String,
            required: true, // เพิ่ม d
        },
        description: { // ✅ แก้ตัวสะกดให้ถูกต้อง (เพิ่ม s)
            type: String,
            required: false, 
        },
        price: { 
            type: Number,
            required: true, // เพิ่ม d
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

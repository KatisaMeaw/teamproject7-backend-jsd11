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
            enum:['Ergonomic Chair','Ergonomic Desk','Accessories'] // เป็นการล็อคสเปคว่า ค่าที่ส่งมาต้องตรงกับคำในลิสต์เท่านั้น
            //Enumerationคือ เป็นเหมือนกล่องที่เราสร้างขึ้นมาเพื่อจัดเก็บสิ่งที่เป็นชนิดเดียวกัน
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

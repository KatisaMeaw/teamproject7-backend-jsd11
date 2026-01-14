import mongoose from "mongoose";

// create schema
const productSchema = new mongoose.Schema(
    {
        id:{
            type: Number, //ชนิดของข้อมูลที่จะต้องใส่
            require: true, // บอกว่าต้องมีนะ
            unique: true, // กำหนดว่าห้ามซ้ำกันเด็ดขาด
        },
        name: {
            type: String,
            require: true,
            trim: true, // ตัดช่องว่างหน้าหลัง
        },
        category:{
            type: String,
            require: true,
            enum:['Erognomic Chair','Table','Accessories'] // เป็นการล็อคสเปคว่า ค่าที่ส่งมาต้องตรงกับคำในลิสต์เท่านั้น
            //Enumerationคือ เป็นเหมือนกล่องที่เราสร้างขึ้นมาเพื่อจัดเก็บสิ่งที่เป็นชนิดเดียวกัน
        },
        image:{
            type: String, // เพราะเก็บเป็น URL
            require: true,
        },
        decription:{
            type: String,
            require: false, // ใส่ก็ได้ไม่ใส่ก็ได้
        },
        price:{ 
            type: Number,
            require: true,
        },
        originalPrice:{
            type: Number,
            require: false,
        },
        discount:{
            type: Number,
            require: false,
        },
    },

    //ตัวช่วยพิเศษของ Mongoose
    //มันจะสร้าง field createdAt (สร้างเมื่อไหร่) และ updatedAt (แก้ไขล่าสุดเมื่อไหร่) ให้เราเองโดยไม่ต้องเขียนโค้ดเพิ่ม
    {
        timestamps: true 
    }
);

export const Product = mongoose.model('Product', productSchema);
// ส่งออกไปใช้งานชื่อ Product
// บอกให้ mongoose สร้าง medel ให้หน่อยโดยมี parameter 2 ตัว
// Product => parameter#1 Name of model
// productSchema =>parameter#2 กฏระเบียที่สร้างไว้ข้างขน

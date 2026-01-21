import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "กรุณากรอกชื่อสินค้า"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "กรุณาเลือกหมวดหมู่"],
      enum: ["Ergonomic Chair", "Ergonomic Desk", "Accessories", "Other"],
    },
    image: {
      type: String,
      required: [true, "กรุณาใส่ URL รูปภาพ"],
      default: "https://via.placeholder.com/150", // ใส่ default ป้องกัน error
    },
    description: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: [true, "กรุณากรอกราคา"],
      min: [0, "ราคาต้องไม่ต่ำกว่า 0"],
    },
    originalPrice: {
      type: Number,
      required: false,
      min: 0,
    },
    discount: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
// ส่งออกไปใช้งานชื่อ Product
// บอกให้ mongoose สร้าง medel ให้หน่อยโดยมี parameter 2 ตัว
// Product => parameter#1 Name of model
// productSchema =>parameter#2 กฏระเบียที่สร้างไว้ข้างขน

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    // เชื่อมโยงว่าใครเป็นคนสั่ง
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false, //เฉพาะเทส ต้องเปลี่ยนเป็น true เมื่อใช้ร่วมกับ auth
      ref: "User",
    },
    // รายการสินค้า
    orderItems: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    status: {
      type: String,
      required: true,
      enum: ["Pending", "Processing", "Shipped", "Delivered"], // ใช้ enum เพื่อจำกัดค่าที่กรอกได้
      default: "Pending",
    },
  },
  { 
    timestamps: true,
    versionKey: false // ช่วยให้ไม่มีฟิลด์ __v ในฐานข้อมูล
  }
);

export const Order = mongoose.model("Order", orderSchema);
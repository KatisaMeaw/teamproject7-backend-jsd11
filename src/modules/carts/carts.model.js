import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  // เชื่อมโยงกับ userId ใน users.model.js
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{
    // เชื่อมโยงกับ productId ใน products.model.js
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 }
  }]
}, { timestamps: true });

export const Cart = mongoose.model("Cart", cartSchema);
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the product name."],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Please select a category."],
      enum: ["Ergonomic Chair", "Ergonomic Desk", "Accessories", "Other"],
    },
    image: {
      type: String,
      required: [true, "Please enter the image URL."],
      default: "https://via.placeholder.com/150",
    },
    description: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: [true, "Please enter the price."],
      min: [0, "The price must not be lower than 0."],
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

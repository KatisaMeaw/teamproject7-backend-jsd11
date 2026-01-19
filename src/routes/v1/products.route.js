import { Router } from "express";
import { getProducts, getProductByID } from "../../modules/products/product.controller.js";

export const router = Router();

// 1. ดึงสินค้าทั้งหมด URL: GET /api/v1/products
router.get('/', getProducts);

// 2. ดึงสินค้าหนึ่งอย่าง URL: GET /api/v1/products/:id
// เติม /:id เพื่อให้รับค่า ID จาก URL ได้
router.get('/:id', getProductByID);
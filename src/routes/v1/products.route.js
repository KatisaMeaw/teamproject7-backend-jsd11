import { Router } from "express";
import { getProducts, getProductByID } from "../../modules/products/product.controller.js";


// create routes
export const router = Router();
// ดึงสินค้าทั้งหมด URL:GET/api/v1/products
router.get('/', getProducts)
// ดึงสินค้าหนึ่งอย่าง URL:GET/api/V1/
router.get('/', getProductByID)
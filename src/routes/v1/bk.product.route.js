import { Router } from "express";
import {
    getProducts,
    getProductByID,
    createProduct,
    updateProduct,
    deleteProduct
} from "../../modules/products/product.controller.js";

export const router = Router();

router.get('/', getProducts); // ดึงสินค้าทั้งหมด URL:GET/api/v1/products
router.get('/:id', getProductByID); // ดึงสินค้าหนึ่งอย่าง URL:GET/api/V1/
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

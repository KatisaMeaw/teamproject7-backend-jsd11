import { Router } from "express";
import { addOrderItems, getMyOrders, cancelOrder } from "../../modules/orders/orders.controller.js";
import { authUser } from "../../middlewares/auth.js";

export const router = Router();

// ทุกคนที่สั่งซื้อหรือดูออเดอร์ต้องล็อกอินก่อน
router.post("/", authUser, addOrderItems);
router.get("/me", authUser, getMyOrders);
router.patch('/:id/cancel', authUser, cancelOrder);

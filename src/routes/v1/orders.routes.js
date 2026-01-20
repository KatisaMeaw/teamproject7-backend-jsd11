import { Router } from "express";
import { addOrderItems } from "../../modules/orders/orders.controller.js";// import { authUser } from "../../middlewares/auth.js"; // ใช้ชื่อให้ตรงกับระบบที่คุณมี

export const router = Router();
/**
 * @route   POST /api/orders
 * @desc    Create new order items
 * @access  Private
 */
router.post("/", addOrderItems);






// router.get("/", getOrders);
export default router;
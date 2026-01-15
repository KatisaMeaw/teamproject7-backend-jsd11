import express from 'express';
const router = express.Router();
import { addOrderItems } from './orders.controller.js';
// import { protect } from '../../middleware/authMiddleware.js'; // สมมติว่ามีตัวเช็ค Token

// กำหนดเส้นทาง POST /api/orders
// แนะนำให้ใส่ protect (Middleware) เพื่อเช็คว่าล็อกอินหรือยังก่อนสั่งซื้อ
router.route('/').post(addOrderItems);

export default router;
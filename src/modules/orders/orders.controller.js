import { Order } from './orders.model.js';
import { Cart } from '../carts/carts.model.js'; // ✅ Import Cart เพื่อใช้ล้างข้อมูลหลังสั่งซื้อ

// เพิ่มของในตะกร้าลง Orders Collection
export const addOrderItems = async (req, res, next) => {
  try {
    const { orderItems, shippingAddress, totalPrice } = req.body;

    // ดึง userId จาก middleware authUser ที่เราใส่ไว้ใน Route
    // โครงสร้างตามที่เขียนไว้ใน auth.js
    const userId = req.user.user._id;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ error: true, message: 'ไม่มีรายการสินค้า' });
    }

    const order = new Order({
      userId,
      orderItems,
      shippingAddress,
      totalPrice,
      status: "Pending"
    });

    const createdOrder = await order.save();

    if (createdOrder) {
      await Cart.findOneAndDelete({ userId });
    }

    res.status(201).json({ error: false, order: createdOrder });
  } catch (error) {
    next(error);
  }
};

// แสดงผลข้อมูลออเดอร์
export const getMyOrders = async (req, res, next) => {
  try {
    const userId = req.user.user._id;

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ error: false, orders });
  } catch (error) {
    next(error);
  }
};
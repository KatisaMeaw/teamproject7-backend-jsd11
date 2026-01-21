import { Order } from './orders.model.js';
import { Cart } from '../carts/carts.model.js';
import { User } from '../users/users.model.js';

// เพิ่มของในตะกร้าลง Orders Collection
export const addOrderItems = async (req, res, next) => {
  try {
    // รับค่าที่ส่งมาจาก Frontend
    const {
      orderItems,
      shippingAddress, // ตัวนี้มีชื่อ, เบอร์, อีเมล อยู่ข้างใน
      totalPrice,
    } = req.body;

    const userId = req.user.user._id;
    const userProfile = await User.findById(userId);
    const actualName = userProfile ? userProfile.name : "Unknown User";

    const order = new Order({
      user: req.user.user._id,
      userName: actualName,
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
    //const userId = req.user.user._id;

    const orders = await Order.find({ user: req.user.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ error: false, orders });
  } catch (error) {
    next(error);
  }
};

// ยกเลิกออเดอร์
export const cancelOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    // อนุญาตให้ยกเลิกเฉพาะสถานะที่กำหนด
    if (order.status !== "Pending") {
      return res.status(400).json({ message: "Cannot cancel order at this stage." });
    }

    order.status = "Cancelled";
    await order.save();

    res.status(200).json({ success: true, message: "Order cancelled successfully" });
  } catch (error) {
    next(error);
  }
};
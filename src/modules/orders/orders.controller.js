import { Order } from './orders.model.js';
import { Cart } from '../carts/carts.model.js'; // ✅ Import Cart เพื่อใช้ล้างข้อมูลหลังสั่งซื้อ

// เพิ่มของในตะกร้าลง Orders Collection
export const addOrderItems = async (req, res, next) => {
  try {
    // รับค่าที่ส่งมาจาก Frontend
    const {
      orderItems,
      shippingAddress, // ตัวนี้มีชื่อ, เบอร์, อีเมล อยู่ข้างใน
      totalPrice
    } = req.body;

    const userId = req.user.user._id;

    const order = new Order({
      user: req.user.user._id,
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
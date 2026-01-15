import Order from './orders.model.js';

//เพิ่มสินค้าในตะกร้าลงในออเดอร์
export const addOrderItems = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      totalPrice
    } = req.body;

    // 1. ตรวจสอบว่ามีสินค้าส่งมาหรือไม่
    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({ message: 'ไม่มีรายการสินค้าในตะกร้า' });
    }

    // 2. สร้าง Instance ของ Order ใหม่
    const order = new Order({
      //user: req.user._id, // ดึง ID ผู้ใช้มาจาก Auth Middleware (ขั้นตอนถัดไป)
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x.id, // แมตช์ ID สินค้าให้ตรงกับ Schema
        _id: undefined // ป้องกัน ID ซ้ำซ้อน
      })),
      shippingAddress,
      totalPrice,
    });

    // 3. บันทึกลง MongoDB
    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการสร้างคำสั่งซื้อ', error: error.message });
  }
};
import { Order } from './orders.model.js';

export const addOrderItems = async (req, res, next) => {
  try {
    const { orderItems, shippingAddress, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({
        error: true,
        message: 'ไม่มีรายการสินค้าในตะกร้า'
      });
    }

    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x.id,
        _id: undefined
      })),
      shippingAddress,
      totalPrice,
    });

    const createdOrder = await order.save();

    // ข้อ 2: จัด Format การตอบกลับใหม่
    res.status(201).json({
      error: false,
      message: "สร้างคำสั่งซื้อสำเร็จ",
      order: createdOrder
    });

  } catch (error) {
    // ใช้ next(error) เพื่อให้เหมือนไฟล์ User
    next(error); 
  }
};
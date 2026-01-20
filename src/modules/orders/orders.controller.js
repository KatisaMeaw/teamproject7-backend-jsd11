import { Order } from './orders.model.js';

// เพิ่มของในตะกร้าลง Orders Collection
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
        name: x.name,
        quantity: x.quantity,
        image: x.image,
        price: x.price,
        product: x.product,
        _id: undefined // ป้องกันการเอา _id ของสินค้ามาปนกับ _id ของ orderItem
      })),
      shippingAddress,
      totalPrice,
      isPaid: false,
      status: "Pending"
    });

    const createdOrder = await order.save();

    // แสดงผลเมื่อสำเร็จ
    res.status(201).json({
      error: false,
      message: "สร้างคำสั่งซื้อสำเร็จ",
      order: createdOrder
    });

  } catch (error) {
    next(error);
  }
};
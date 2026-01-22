import { Cart } from "./carts.model.js";

// เพิ่มสินค้าลงตะกร้า
export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    
    // ✅ ดึง userId จาก Token (ตามโครงสร้าง Middleware ของคุณคือ req.user.user._id)
    const userId = req.user.user._id; 

    // 1. หาตะกร้าของผู้ใช้คนนี้
    let cart = await Cart.findOne({ userId });

    if (cart) {
      // ถ้ามีตะกร้าแล้ว ให้เช็คว่ามีสินค้านี้ในตะกร้าหรือยัง
      const itemIndex = cart.products.findIndex(p => p.productId.toString() === productId);

      if (itemIndex > -1) {
        // ถ้ามีสินค้าแล้ว ให้บวกจำนวนเพิ่ม (ตรวจสอบว่าเป็นตัวเลขป้องกัน Error)
        cart.products[itemIndex].quantity += Number(quantity);
      } else {
        // ถ้ายังไม่มี ให้ push สินค้าใหม่เข้าไป
        cart.products.push({ productId, quantity: Number(quantity) });
      }
      await cart.save();
    } else {
      // 2. ถ้ายังไม่มีตะกร้าเลย ให้สร้างใหม่
      cart = await Cart.create({
        userId,
        products: [{ productId, quantity: Number(quantity) }]
      });
    }

    res.status(200).json({ 
        success: true, 
        message: "อัปเดตตะกร้าสินค้าสำเร็จ",
        data: cart 
    });
  } catch (error) {
    // ✅ ส่ง Error ไปที่ Global Handler ใน app.js
    next(error); 
  }
};

// ดึงสินค้าในตะกร้า
export const getCart = async (req, res, next) => {
  try {
    const userId = req.user.user._id;

    // ใช้ .populate เพื่อดึงข้อมูลสินค้า (ชื่อ, ราคา, รูป) จาก Product Model
    const cart = await Cart.findOne({ userId }).populate("products.productId");

    if (!cart) {
      return res.status(200).json({ success: true, products: [] });
    }

    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    next(error);
  }
};

// อัปเดตจำนวนสินค้า
export const updateCartQuantity = async (req, res, next) => {
  try {
    const { productId } = req.params; // รับ ID จาก URL
    const { quantity } = req.body;    // รับจำนวนใหม่จาก Body
    const userId = req.user.user._id;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ success: false, message: "ไม่พบตะกร้าสินค้า" });

    const itemIndex = cart.products.findIndex(p => p.productId.toString() === productId);

    if (itemIndex > -1) {
      cart.products[itemIndex].quantity = Number(quantity);
      await cart.save();
      res.status(200).json({ success: true, data: cart });
    } else {
      res.status(404).json({ success: false, message: "ไม่พบสินค้านี้ในตะกร้า" });
    }
  } catch (error) {
    next(error);
  }
};

// ลบสินค้า
export const removeItemFromCart = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const userId = req.user.user._id;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ success: false, message: "ไม่พบตะกร้าสินค้า" });

    // กรองเอาสินค้าที่ไม่ใช่ตัวที่ต้องการลบไว้
    cart.products = cart.products.filter(p => p.productId.toString() !== productId);

    await cart.save();
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    next(error);
  }
};

// ล้างตะกร้าสินค้าทั้งหมด
export const clearCart = async (req, res, next) => {
  try {
    const userId = req.user.user._id;

    const cart = await Cart.findOneAndDelete({ userId });
    if (!cart) {
      return res.status(200).json({ 
        success: true, 
        message: "ไม่พบตะกร้าสินค้าที่ต้องการลบ" 
      });
    }
    res.status(200).json({ 
      success: true, 
      message: "ล้างตะกร้าสินค้าเรียบร้อยแล้ว" 
    });
  } catch (error) {
    next(error);
  }
};
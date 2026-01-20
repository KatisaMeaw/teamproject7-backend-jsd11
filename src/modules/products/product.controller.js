import { Product } from "./products.model.js";

// ✅ 1. ฟังก์ชันดึงสินค้าทั้งหมด (Get All Products)
export const getProducts = async (req, res) => {
    try {
        // ค้นหาข้อมูลใน Model สินค้า  {}= "เอามาทั้งหมดเลย ไม่ต้องกรองอะไรทั้งนั้น" (Select All)
        // await: "รอเดี๋ยว" สั่งให้หยุดรอจนกว่า Database จะวิ่งไปกวาดข้อมูลมาครบทุกชิ้นแล้วค่อยไปต่อ
        // const products: เมื่อได้ข้อมูลมาแล้ว ก็เอามาเก็บใส่กล่อง (ตัวแปร) ชื่อ products
        // ค้นหาข้อมูลทั้งหมดใน MongoDB
        const products = await Product.find({});

        // ส่งข้อมูลกลับไปให้ Frontend ในรูปแบบ Object ที่มี property ชื่อ data
        // เพื่อให้ตรงกับโค้ดหน้าบ้านที่เขียนว่า result.data
        res.status(200).json({ data: products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ 2. ฟังก์ชันดึงสินค้าชิ้นเดียว (Get Product By ID)
export const getProductByID = async (req, res) => { // แก้ลำดับเป็น (req, res)
    try {
        const { id } = req.params;

        // ใช้ findById(id)
        // มันจะไปหาจาก _id: "6968ed3e..." ใน MongoDB ให้เอง
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ data: product });
    } catch (error) {
        res.status(500).json({ message: "Invalid ID format or Server Error" });
    }
};
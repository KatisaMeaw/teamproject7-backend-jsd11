import { Product } from "./products.model.js"; // 1. เรียกโมเดล (เครื่องมือ) มาใช้งาน

//ฟังก์ชันดึงสินค้าทั้งหมด (Get All Products)
//ฟังก์ชันใน Controller ทุกตัวจะต้องรับ 2 สิ่งนี้เสมอ (req, res)
//สร้างฟังก์ชันชื่อ createProduct เพื่อรอรับคำสั่ง
//async ฟังก์ชันนี้มีการทำงานที่ไม่ต้องรอนะ
export const getProducts =  async (req, res) => {
    try {
        // ค้นหาข้อมูลใน Model สินค้า  {}= "เอามาทั้งหมดเลย ไม่ต้องกรองอะไรทั้งนั้น" (Select All)
        // await: "รอเดี๋ยว" สั่งให้หยุดรอจนกว่า Database จะวิ่งไปกวาดข้อมูลมาครบทุกชิ้นแล้วค่อยไปต่อ
        // const products: เมื่อได้ข้อมูลมาแล้ว ก็เอามาเก็บใส่กล่อง (ตัวแปร) ชื่อ products
        const products = await Product.find({});

        // ส่งของกลับไปให้ลูกค้า (Frontend) พร้อมบอกว่า OK (Status 200)
        //.json(products): ส่งรายการสินค้าทั้งหมดที่อยู่ในตัวแปร products กลับไปให้หน้าบ้าน (Frontend) เพื่อเอาไปวนลูปแสดงผลบนหน้าจอ
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};

//ฟังก์ชันดึงสินค้าชิ้นเดียว (Get Product By ID)
export const getProductByID = async (req, res) => {
    try {
        // รับเลข ID ที่ลูกค้าส่งมา - เป็นการแกะกล่องรับค่าที่ส่งมากับ URL
        // เพื่อให้เรารู้ว่าลูกค้าต้องการดูสินค้าหมายเลขอะไร แล้วไปเก็บไว้ในตัวแปร id
        const {id} = req.params;
        // สั่ง Model ให้หาของที่ field 'id' ตรงกับเลขที่ส่งมา
        const product = await Product.findOne({_id: parseInt(id)})

        if(!product){ // "ถ้าตัวแปร product ว่างเปล่า" (คือ Database หาเลขนี้ไม่เจอ)
            return res.status(404).json({message:"Production not found"});
        }
        res.status(200).json(product) //แต่ถ้าเจอก็ให้ส่งข้อมูลสินค้านั้นๆ กลับไปให้ลูกค้าดู
    } catch (error) {
        res.status(500).json({message : error.message});
    }
};



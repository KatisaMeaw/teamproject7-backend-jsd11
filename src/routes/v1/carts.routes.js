import { Router } from "express";
import {
  addToCart,
  getCart,
  updateCartQuantity,
  removeItemFromCart,
  clearCart
} from "../../modules/carts/carts.controller.js";
import { authUser } from "../../middlewares/auth.js";

export const router = Router();

router.get("/", authUser, getCart);                       // GET /api/carts
router.post("/", authUser, addToCart);                    // POST /api/carts
router.put("/:productId", authUser, updateCartQuantity);   // PUT /api/carts/:productId
router.delete("/:productId", authUser, removeItemFromCart); // DELETE /api/carts/:productId
router.delete("/", authUser, clearCart);
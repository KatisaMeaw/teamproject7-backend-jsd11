import { Router } from "express";
import {router as usersRoutes} from "./users.routes.js";
import {router as productRoutes} from "./products.route.js"
import {router as ordersRoutes} from "./orders.routes.js";
import {router as cartRoutes} from "./carts.routes.js";

export const router = Router();

router.use("/users", usersRoutes);
router.use("/admins", usersRoutes);
router.use("/products", productRoutes);
router.use("/carts", cartRoutes);
router.use("/orders", ordersRoutes);


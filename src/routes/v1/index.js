import { Router } from "express";
import {router as usersRoutes} from "./users.routes.js";
import {productRoutes} from "./products.route.js"

export const router = Router();

router.use("/users", usersRoutes);
router.use("/admins", usersRoutes);
router.use("/products", productRoutes);
router.use("/orders", usersRoutes);


import { Router } from "express";
import {router as usersRoutes} from "./users.routes.js";

export const router = Router();

router.use("/users", usersRoutes);
router.use("/admins", usersRoutes);
router.use("/products", usersRoutes);
router.use("/orders", usersRoutes);
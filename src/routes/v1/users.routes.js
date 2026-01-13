import { Router } from "express";
import { createUser, deleteUser, getUser, getUsers, updateUser} from "../../modules/users/users.controller.js";

export const router = Router()


router.get("/", getUsers);

router.get("/:id", getUser);

router.post("/", createUser);

// The function inside is called Route Handler / Controller
router.delete("/:id", deleteUser);

router.patch("/:id", updateUser);
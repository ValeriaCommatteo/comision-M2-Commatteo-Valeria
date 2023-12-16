import { Router } from "express";
import { register, login, logout, profile, verifyToken } from "../controllers/authController.js";
import { tokenAuth } from "../middlewares/auth.js";
import { validateSchema } from "../middlewares/verification.js";
import { loginSchema, registerSchema } from "../schemas/authSchema.js";

const router = Router();

router.post("/register", validateSchema(registerSchema), register)
router.post("/login", validateSchema(loginSchema), login)
router.post("/logout", logout)
router.get("/verifyToken", verifyToken)
router.get("/profile", tokenAuth, profile)

export default router;
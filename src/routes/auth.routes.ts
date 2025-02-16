import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import { validate } from "../middleware/validate";
import { loginDto } from "./dto/login.dto";

const router = Router();

router.post("/login", validate(loginDto), AuthController.login);

export default router;

import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import { validate } from "../middleware/validate";
import { loginDto, loginGoogleDto } from "./dto/login.dto";

const router = Router();

router.post("/login", validate(loginDto), AuthController.login);
router.post(
  "/login/google",
  validate(loginGoogleDto),
  AuthController.loginGoogle
);

export default router;

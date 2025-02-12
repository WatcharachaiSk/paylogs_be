import { Router } from "express";
import UserController from "../controllers/user.controller";
import { validate } from "../middleware/validate";
import {
  updateUserSchema,
  deleteUserSchema,
} from "../controllers/dto/user.dto";

const router = Router();

router.get("", UserController.getAll);
router.get("/find", UserController.getUserByEmail);
router.post("/register", UserController.register);
router.post("/update", validate(updateUserSchema), UserController.update);
router.post("/delete", validate(deleteUserSchema), UserController.softDelete);

export default router;

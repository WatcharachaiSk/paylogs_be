import { Router } from "express";
import UserController from "../controllers/user.controller";
import { validate } from "../middleware/validate";
import { updateUserSchema, deleteUserSchema } from "./dto/user.dto";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

// router.get("", UserController.getAll);
router.get("/find", authenticate, UserController.getUserByEmail);
router.post("/register", UserController.register);
router.post(
  "/update",
  authenticate,
  validate(updateUserSchema),
  UserController.update
);
router.post(
  "/delete",
  authenticate,
  validate(deleteUserSchema),
  UserController.softDelete
);

export default router;

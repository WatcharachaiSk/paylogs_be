import { Router } from "express";
import { validate } from "../middleware/validate";
import categoryController from "../controllers/category.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.get("/", authenticate, categoryController.getAll);

export default router;

import { Router } from "express";
// import { validate } from "../middleware/validate";
import { authenticate } from "../middleware/auth.middleware";
import LogsController from "../controllers/logs.controller";
import { createLogsSchema } from "./dto/logs.dto";
import { validate } from "../middleware/validate";

const router = Router();

router.get("/", authenticate, LogsController.getAll);
router.post(
  "/",
  authenticate,
  validate(createLogsSchema),
  LogsController.create
);

export default router;

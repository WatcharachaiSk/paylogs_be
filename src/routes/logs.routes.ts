import { Router } from "express";
// import { validate } from "../middleware/validate";
import { authenticate } from "../middleware/auth.middleware";
import LogsController from "../controllers/logs.controller";
import { createLogsSchema, daleteLogsSchema, updateLogsSchema } from "./dto/logs.dto";
import { validate } from "../middleware/validate";

const router = Router();

router.get("/dashboard", authenticate, LogsController.getDashboard);
router.get("/user", authenticate, LogsController.getAllUser);
router.get("/:id", authenticate, LogsController.getById);
router.post(
  "/",
  authenticate,
  validate(createLogsSchema),
  LogsController.create
);
router.post(
  "/update",
  authenticate,
  validate(updateLogsSchema),
  LogsController.update
);
router.post(
  "/delete",
  authenticate,
  validate(daleteLogsSchema),
  LogsController.softDelete
);

export default router;

import express from "express";
import AdminController from "../controller/adminContoller.js";
import authenticateToken from "../helpers/middleware/jwt.js";
import { checkIfAdmin } from "../helpers/middleware/userRoleCheck.js";
import LeaveController from "../controller/leaveController.js";

const router = express.Router();

router.get(
  "/users",
  authenticateToken,
  checkIfAdmin,
  AdminController.UserListing
);
router.get(
  "/leaves/:userId?",
  authenticateToken,
  checkIfAdmin,
  LeaveController.allLeavesRequests
);
router.patch(
  "/leave-status",
  authenticateToken,
  checkIfAdmin,
  LeaveController.leaveApproval
);
export default router;

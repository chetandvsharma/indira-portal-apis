import express from "express";
import AdminController from "../controller/adminContoller.js";
import LeaveController from "../controller/leaveController.js";
import authenticateToken from "../helpers/middleware/jwt.js";
import { checkIfAdmin } from "../helpers/middleware/userRoleCheck.js";

const router = express.Router();

router.get(
  "/users",
  authenticateToken,
  checkIfAdmin,
  AdminController.UserListing
);

router.post(
  "/leave",
  authenticateToken,
  LeaveController.applyLeave
);

router.get(
  "/leave",
  authenticateToken,
  LeaveController.myLeaves
);

export default router;

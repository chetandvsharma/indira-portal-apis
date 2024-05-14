import express from "express";
import AuthController from "../controller/authController.js";

const router = express.Router();

router.post("/sign-up", AuthController.SignUp);
router.post("/sign-in", AuthController.SignIn);

export default router;

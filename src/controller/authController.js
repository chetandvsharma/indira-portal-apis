import bcrypt from "bcryptjs";
import User from "../dao/User.js";
import log from "../helpers/custom/logger.js";
import { generateToken } from "../utils/jwtUtils.js";

export default class AuthController {
  static async SignUp(req, res) {
    try {
      const { email, username, password, isAdmin } = req.body;
      const user = new User();

      const checkDuplicate = await user.findByEmail(email);

      if (checkDuplicate) {
        return res.status(409).json({ message: "Email already exist" });
      }
    
      await user.create({ email, username, password, isAdmin });
      res.status(201).json({ message: "Signed up successfully" });
    } catch (error) {
      log(error.message || "internal server error");
      return res
        .status(500)
        .json({ error: error.message || "Internal server error" });
    }
  }

  static async SignIn(req, res) {
    try {
      const { email, password } = req.body;
      const user = new User();
      const existingUser = await user.findByEmail(email);

      if (!existingUser) {
        return res.status(401).json({ message: "Invalid email" });
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
      }

      const token = generateToken({ userId: existingUser?.id.toString() });
      return res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      console.error(error);
      log(error?.message || "internal server error");
      return res
        .status(500)
        .json({ error: error?.message || "Internal server error" });
    }
  }
}

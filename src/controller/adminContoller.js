import User from "../dao/User.js";
import log from "../helpers/custom/logger.js";
import { generateToken } from "../utils/jwtUtils.js";

export default class AdminController {
  static async UserListing(req, res) {
    try {
      const { page, limit } = req.query;
      const pagination = {
        page: +page || 1,
        limit: +limit || 25,
      };

      pagination.skip = Number((pagination.page - 1) * pagination.limit);

      const user = new User();

      const result = await user.findAllUser(pagination.limit, pagination.skip);
      pagination.totalRecords = result?.totalRecords;
      res
        .status(200)
        .json({
          message: "User list successfully",
          data: result?.data,
          pagination,
        });
    } catch (error) {
      console.error(error);
      log(error.message || "internal server error");
      return res
        .status(500)
        .json({ error: error.message || "Internal server error" });
    }
  }
}

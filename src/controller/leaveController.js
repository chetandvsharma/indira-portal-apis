import log from "../helpers/custom/logger.js";
import Leave from "../dao/Leave.js";

const leave = new Leave();

export default class LeaveController {
  static async applyLeave(req, res) {
    try {
      const { startDate, endDate, reason } = req.body;
      const userId = req.user.userId;
      const leave = new Leave();

      await leave.create({ userId, startDate, endDate, reason });

      res.status(201).json({
        message: "Leave requested",
      });
    } catch (error) {
      log(error.message || "Internal Server Error");
      res.status(500).json({
        message: error.message || "Internal Server Error",
        error,
      });
    }
  }

  static async myLeaves(req, res) {
    try {
      const { page, limit } = req.query;
      const pagination = {
        page: +page || 1,
        limit: +limit || 25,
      };

      pagination.skip = Number((pagination.page - 1) * pagination.limit);

      const leave = new Leave();

      const result = await leave.findByID(
        req?.user?.userId,
        pagination.limit,
        pagination.skip
      );

      pagination.totalRecords = result?.totalRecords;

      res.status(200).json({
        message: "My leaves fetched successfully",
        data: result?.data,
        pagination,
      });
    } catch (error) {
      log(error.message || "Internal Server Error");
      res.status(500).json({
        message: error.message || "Internal Server Error",
        error,
      });
    }
  }

  static async allLeavesRequests(req, res) {
    try {
      let result = {};
      const { page, limit } = req.query;
      const pagination = {
        page: +page || 1,
        limit: +limit || 25,
      };

      pagination.skip = Number((pagination.page - 1) * pagination.limit);

      const leave = new Leave();
      if (req?.params?.userId) {
        result = await leave.findByID(
          req?.params?.userId,
          pagination.limit,
          pagination.skip
        );
      } else {
        result = await leave.findAll(pagination.limit, pagination.skip);
      }
      pagination.totalRecords = result?.totalRecords;

      res.status(200).json({
        message: "all leave requests fetched successfully",
        data: result?.data,
        pagination,
      });
    } catch (error) {
      log(error.message || "Internal Server Error");
      res.status(500).json({
        message: error.message || "Internal Server Error",
        error,
      });
    }
  }

  static async leaveApproval(req, res) {
    try {
      const {leaveId, status} = req.body;

      const result = await leave.updateStatus(leaveId, status);

      res.status(200).json({
        message: `leave requests ${status} successfully`,
      });
    } catch (error) {
      log(error.message || "Internal Server Error");
      res.status(500).json({
        message: error.message || "Internal Server Error",
        error,
      });
    }
  }
}

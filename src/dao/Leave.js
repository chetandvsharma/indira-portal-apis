import db from "../../config/mysqlConfig.js";

export default class Leave {
  async create({ userId, startDate, endDate, reason }) {
    const [result] = await db.execute(
      "INSERT INTO leaves ( user_id, start_date, end_date, reason) VALUES (?, ?, ?, ?)",
      [userId, startDate, endDate, reason]
    );

    return result.insertId;
  }

  async findByID(userId, limit = 20, skip = 0) {
    const [rows] = await db.execute(
      `SELECT * FROM leaves  WHERE user_id = ? LIMIT ${limit} OFFSET ${skip}`,
      [userId]
    );

    const [countResult] = await db.execute(
      `SELECT COUNT(*) as TOTAL FROM leaves`
    );

    return {
      data: rows || null,
      totalRecords: countResult[0].TOTAL || "no record found",
    };
  }

  async findAll(limit = 20, skip = 0) {
    const [rows] = await db.execute(
      `SELECT * FROM leaves LIMIT ${limit} OFFSET ${skip}`
    );

    const [countResult] = await db.execute(
      `SELECT COUNT(*) as TOTAL FROM leaves`
    );
    return {
      data: rows || null,
      totalRecords: countResult[0].TOTAL || "no record found",
    };
  }

  async updateStatus(leaveId, newStatus) {
    try {
      const [result] = await db.execute(
        `UPDATE leaves SET status = ?  WHERE id = ?`,
        [newStatus, leaveId]
      );

      if (result.affectedRows === 0) {
        throw new Error("Leave application not found or status not updated");
      }

      return "Leave status updated successfully";
    } catch (error) {
      // Handle errors
      console.error("Error updating leave status:", error);
      throw error;
    }
  }
}

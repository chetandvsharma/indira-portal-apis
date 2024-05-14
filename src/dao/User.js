import db from "../../config/mysqlConfig.js";
import bcrypt from "bcryptjs";

class User {
  async create({ email, username, password, isAdmin = 0 }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.execute(
      "INSERT INTO users (email, username, password, isAdmin) VALUES (?, ?, ?, ?)",
      [email, username, hashedPassword, isAdmin]
    );

    return result.insertId;
  }

  async findByEmail(email) {
    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    return rows[0] || null;
  }

  async findByID(id) {
    const [rows] = await db.execute("SELECT * FROM users WHERE id = ?", [
      id,
    ]);
    return rows[0] || null;
  }

  // admin + user
  async findAll(limit = 20, skip = 0) {
    const [rows] = await db.execute(
      `SELECT * FROM users LIMIT ${limit} OFFSET ${skip}`
    );

    const [countResult] = await db.execute(
      `SELECT COUNT(*) as TOTAL FROM users`
    );
    return {
      data: rows || null,
      totalRecords: countResult[0].TOTAL || "no record found",
    };
  }

  async findAllUser(limit = 20, skip = 0) {
    const [rows] = await db.execute(
      `SELECT * FROM users WHERE isAdmin=0 LIMIT ${limit} OFFSET ${skip}`
    );

    const [countResult] = await db.execute(
      `SELECT COUNT(*) as TOTAL FROM users WHERE isAdmin=0`
    );
    return {
      data: rows || null,
      totalRecords: countResult[0].TOTAL || "no record found",
    };
  }
}

export default User;

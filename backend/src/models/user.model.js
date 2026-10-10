
import pool from "../config/database.js";

export const findAllUsers = async () => {
  const [rows] = await pool.query(
    `SELECT id, fullname, username, email, created_at, updated_at
     FROM users`
  );
  return rows;
};

export const findUserById = async (id) => {
  const [rows] = await pool.query(
    `SELECT id, fullname, username, email, created_at, updated_at
     FROM users
     WHERE id = ?`,
    [id]
  );
  return rows[0];
};

export const insertUser = async (user) => {
  const [result] = await pool.query(
    "INSERT INTO users (fullname, username, email, password) VALUES (?, ?, ?, ?)",
    [user.fullname, user.username, user.email, user.password]
  );
  return result;
};


export const modifyUser = async (id, user) => {
  const allowedFields = ["fullname", "username", "email", "password"];
  const fields = Object.keys(user).filter((key) =>
    allowedFields.includes(key)
  );

  if (fields.length === 0) {
    const error = new Error("Tidak ada field valid untuk di-update");
    error.statusCode = 400;
    throw error;
  }

  const values = fields.map((field) => user[field]);
  const setClause = fields.map((field) => `${field} = ?`).join(", ");

  const [result] = await pool.query(
    `UPDATE users SET ${setClause} WHERE id = ?`,
    [...values, id]
  );

  return result;
};

export const removeUser = async (id) => {
  const [result] = await pool.query(
    "DELETE FROM users WHERE id = ?",
    [id]
  );
  return result;
};

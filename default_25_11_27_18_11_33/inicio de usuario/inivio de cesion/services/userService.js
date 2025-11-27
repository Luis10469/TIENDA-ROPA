import connectDatabase from "../config/database.js";

export async function getUserByEmail(email) {
  const pool = await connectDatabase();
  const [rows] = await pool.execute(
    "SELECT id, name, email, password_hash FROM users WHERE email = ? LIMIT 1",
    [email]
  );
  return rows[0] ?? null;
}

export async function createUser({ name, email, passwordHash }) {
  const pool = await connectDatabase();
  const [result] = await pool.execute(
    "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
    [name, email, passwordHash]
  );
  return result.insertId;
}

export async function getUserById(id) {
  const pool = await connectDatabase();
  const [rows] = await pool.execute(
    "SELECT id, name, email, created_at FROM users WHERE id = ? LIMIT 1",
    [id]
  );
  return rows[0] ?? null;
}

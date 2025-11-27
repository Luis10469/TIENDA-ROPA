import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export default async function connectDatabase() {
  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10,
    namedPlaceholders: true,
    decimalNumbers: true
  });

  try {
    await pool.query("SELECT 1");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw new Error("Database connection failed");
  }

  return pool;
}

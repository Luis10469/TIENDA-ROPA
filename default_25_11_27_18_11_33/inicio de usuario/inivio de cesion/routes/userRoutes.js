import express from "express";
import { verifyJWT } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile", verifyJWT, async (req, res, next) => {
  const pool = req.pool;
  try {
    const [rows] = await pool.execute(
      "SELECT id, name, email, created_at FROM users WHERE id = ? LIMIT 1",
      [req.user.id]
    );

    if (!Array.isArray(rows) || rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const user = rows[0];
    return res.json({
      profile: user
    });
  } catch (error) {
    return next(error);
  }
});

router.get("/validate-email", async (req, res, next) => {
  const pool = req.pool;
  const email = String(req.query.email || "").trim();

  if (!email) {
    return res.status(400).json({ error: "Email requerido" });
  }

  try {
    const [rows] = await pool.execute(
      "SELECT id FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    return res.json({ available: rows.length === 0 });
  } catch (error) {
    return next(error);
  }
});

export default router;

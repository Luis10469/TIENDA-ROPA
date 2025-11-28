import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const SALT_ROUNDS = 12;
const JWT_EXPIRATION = "3h";

router.post(
  "/login",
  body("email").isEmail().withMessage("Correo válido requerido"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Contraseña de al menos 6 caracteres"),
  async (req, res, next) => {
    const pool = req.pool;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const [rows] = await pool.execute(
        "SELECT id, name, email, password_hash FROM users WHERE email = ? LIMIT 1",
        [email]
      );

      if (!Array.isArray(rows) || rows.length === 0) {
        return res
          .status(404)
          .json({ error: "Usuario no encontrado", code: "USER_NOT_FOUND" });
      }

      const user = rows[0];
      const passwordMatch = await bcrypt.compare(password, user.password_hash);

      if (!passwordMatch) {
        return res.status(401).json({ error: "Credenciales inválidas" });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        {
          expiresIn: JWT_EXPIRATION
        }
      );

      return res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      });
    } catch (error) {
      return next(error);
    }
  }
);

router.post(
  "/register",
  body("name").isLength({ min: 4 }).withMessage("Nombre mínimo 4 caracteres"),
  body("email").isEmail().withMessage("Correo válido requerido"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Contraseña de al menos 6 caracteres"),
  async (req, res, next) => {
    const pool = req.pool;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      const [existingUsers] = await pool.execute(
        "SELECT id FROM users WHERE email = ?",
        [email]
      );

      if (existingUsers.length > 0) {
        return res
          .status(409)
          .json({ error: "Correo ya registrado", code: "EMAIL_EXISTS" });
      }

      const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
      await pool.execute(
        "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
        [name, email, passwordHash]
      );

      return res.status(201).json({
        message: "Cuenta creada con éxito. Revisa tu correo para verificar."
      });
    } catch (error) {
      return next(error);
    }
  }
);

export default router;

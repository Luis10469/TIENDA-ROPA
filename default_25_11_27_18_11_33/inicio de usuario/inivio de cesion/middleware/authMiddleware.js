import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (!payload || !payload.id) {
      throw new Error("Invalid token payload");
    }
    req.user = { id: payload.id };
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
}

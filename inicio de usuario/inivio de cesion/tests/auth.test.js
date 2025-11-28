import request from "supertest";
import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import authRoutes from "../routes/authRoutes.js";

dotenv.config();

const buildApp = (mockPool) => {
  const app = express();
  app.use(express.json());
  app.use(
    session({
      secret: "test-secret",
      resave: false,
      saveUninitialized: false
    })
  );
  app.use((req, _, next) => {
    req.pool = mockPool;
    next();
  });
  app.use("/api/auth", authRoutes);
  return app;
};

describe("Auth routes", () => {
  const mockPool = {
    execute: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("registers a user successfully", async () => {
    mockPool.execute.mockResolvedValueOnce([[]]); // no existing email
    mockPool.execute.mockResolvedValueOnce([{ insertId: 1 }]);

    const app = buildApp(mockPool);

    const res = await request(app).post("/api/auth/register").send({
      name: "Street Artist",
      email: "artist@street.com",
      password: "boldStyle1"
    });

    expect(res.status).toBe(201);
    expect(res.body.message).toContain("Cuenta creada");
  });

  it("fails login when user missing", async () => {
    mockPool.execute.mockResolvedValueOnce([[]]);
    const app = buildApp(mockPool);
    const res = await request(app).post("/api/auth/login").send({
      email: "missing@street.com",
      password: "password123"
    });

    expect(res.status).toBe(404);
    expect(res.body.error).toBe("Usuario no encontrado");
  });
});

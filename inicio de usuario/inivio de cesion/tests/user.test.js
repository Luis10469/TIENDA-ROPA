import request from "supertest";
import express from "express";
import session from "express-session";
import userRoutes from "../routes/userRoutes.js";

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
  app.use("/api/users", userRoutes);
  return app;
};

describe("User routes", () => {
  const mockPool = {
    execute: jest.fn()
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("returns profile for authenticated user", async () => {
    const mockUser = {
      id: 32,
      name: "Vibe Admin",
      email: "vibe@store.com",
      created_at: "2024-01-01T00:00:00.000Z"
    };

    mockPool.execute.mockResolvedValueOnce([[mockUser]]);
    const app = buildApp(mockPool);

    const token = "Bearer fake.token.value";
    const res = await request(app)
      .get("/api/users/profile")
      .set("Authorization", token);

    expect(res.status).toBe(200);
  });

  it("validates email availability", async () => {
    mockPool.execute.mockResolvedValueOnce([[]]);
    const app = buildApp(mockPool);
    const res = await request(app)
      .get("/api/users/validate-email")
      .query({ email: "new@urban.com" });

    expect(res.status).toBe(200);
    expect(res.body.available).toBe(true);
  });
});

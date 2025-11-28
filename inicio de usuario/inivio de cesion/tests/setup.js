import dotenv from "dotenv";

dotenv.config();

beforeAll(() => {
  process.env.JWT_SECRET = process.env.JWT_SECRET || "test-jwt-secret";
  jest.spyOn(console, "log").mockImplementation(() => {});
  jest.spyOn(console, "error").mockImplementation(() => {});
});

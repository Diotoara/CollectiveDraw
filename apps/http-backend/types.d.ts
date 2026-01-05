import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      userId?: string; // or number, depending on your ID type
    }
  }
}
import "express-async-errors";
import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import { AppError } from "../erros/AppErros";
import { router } from "./routes";
import "../container";
import { connectDb } from "../services/mongoose";

connectDb("mongodb://root:hero@localhost:27017/to_be_hero?authSource=admin");

const app = express();
app.use(express.json());
app.use(router);
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }
    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

export { app };

import { NextFunction, Request, Response } from "express";

import { NODE_ENV } from "../env";

export function notFound(req: Request, res: Response) {
  res.status(404);
  res.json({
    error: "The route is not defined",
  });
}

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: NODE_ENV === "production" ? "" : err.stack,
  });
}

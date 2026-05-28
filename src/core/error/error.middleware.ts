import { NextFunction, Request, Response } from "express";
import { error } from "node:console";
import { ZodError } from "zod";

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof ZodError) {
    console.log(err.issues);
    const message = err.issues.map((issue) => issue.message).join(" ");
    return res.json({ message });
  }
  res.json({ message: "Dario" });
}

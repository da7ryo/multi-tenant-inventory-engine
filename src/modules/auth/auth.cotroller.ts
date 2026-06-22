import { Request, Response } from "express";

export async function login(req: Request, res: Response) {
  const { email, paswword } = req.body;

  // Find user by email
  // Hash password and compare with stored password in DB

  // Generate JWT token
  return res.json({});
}

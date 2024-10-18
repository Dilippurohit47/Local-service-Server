import { Request, Response } from "express";
import { registerSchema } from "../validations/authValidations.js";

export const SignIn = (req: Request, res: Response) => {
  try {
    const body = req.body;
    const payload = registerSchema.parse(body);
    res.json(payload);
  } catch (error) {
    return res.status(422).json(error);
  }
};

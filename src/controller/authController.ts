import { Request, Response } from "express";
import { registerSchema } from "../validations/authValidations.js";
import { ZodError } from "zod";
import { formatError } from "../helper.js";

export const SignIn = (req: Request, res: Response) => {
  try {
    const body = req.body;
    const payload = registerSchema.parse(body);
    res.json(payload);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(422).json(formatError(error));
    }
    return res.status(500).json("Internal server error");
  }
};

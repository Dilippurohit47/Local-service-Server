import { Request, Response } from "express";
import { registerSchema } from "../validations/authValidations.js";
import { ZodError } from "zod";
import { formatError } from "../helper.js";
import prisma from "../config/database.js";
import bcrypt from "bcrypt";
export const SignIn = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const payload = registerSchema.parse(body);

    let user = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (user) {
      return res.status(422).json({
        error: {
          message: "Email already exist try different eamil or login",
        },
      });
    }
    payload.password = await bcrypt.hash(payload.password, 10);

    await prisma.user.create({
      data: payload,
    });

    return res.status(200).json({
      message: "User created successfully",
    });
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = formatError(error);
      return res.status(422).json({
        message: "Invalid data",
        errors,
      });
    }
    return res.status(500).json("Internal server error");
  }
};

import { Request, Response } from "express";
import { serviceManRegisterSchema } from "../validations/authValidations.js";
import { ZodError } from "zod";
import { formatError } from "../helper.js";
import prisma from "../config/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const ServiceManSignUp = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const payload = serviceManRegisterSchema.parse(body);
    let user = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });
    let serviceMan = await prisma.serviceMan.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (user || serviceMan) {
      return res.status(422).json({
        error: {
          message: "User already exist with this email",
        },
      });
    }
    payload.password = await bcrypt.hash(payload.password, 10);

    await prisma.serviceMan.create({
      data: payload,
    });

    return res.status(200).json({
      message: "ServiceMan created successfully",
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

export const ServiceManSignIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const serviceMan = await prisma.serviceMan.findUnique({
      where: {
        email: email,
      },
    });
    if (serviceMan) {
      const hashedPassword = await bcrypt.compare(
        password,
        serviceMan?.password
      );
      if (!hashedPassword) {
        return res.status(401).json({
          message: "Eamil or password is incorrect ",
        });
      }
      const token = jwt.sign({ id: serviceMan.id }, process.env.JWT_SECRET!, {
        expiresIn: "30d",
      });
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      return res.status(200).json({
        message: "Login Successfully",
      });
    }
    return res.status(404).json({
      message: "Email doesn't exist",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

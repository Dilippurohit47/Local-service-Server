import { Request, Response } from "express";
import { registerSchema } from "../validations/authValidations.js";
import { ZodError } from "zod";
import { formatError } from "../helper.js";
import prisma from "../config/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const SignUp = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const payload = registerSchema.parse(body);
    let user = await prisma.user.findFirst({
      where: {
        OR: [{ email: payload.email }, { phoneNo: payload.phoneNo }],
      },
    });

    if (user?.email === payload.email) {
      return res.status(422).json({
        error: {
          message: "Email already exist try different eamil or login",
        },
      });
    }
    if (user?.phoneNo === payload.phoneNo) {
      return res.status(422).json({
        error: {
          message: "Phone Number already exist",
        },
      });
    }
    payload.password = await bcrypt.hash(payload.password, 10);

    await prisma.user.create({
      data: payload,
    });

    return res.status(200).json({
      message: "Signup successfully",
    });
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = formatError(error);
      return res.status(422).json({
        message: "please Provide all fields",
        errors,
      });
    }
    return res.status(500).json("Internal server error");
  }
};

export const SignIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (user) {
      const hashedPassword = await bcrypt.compare(password, user?.password);
      if (!hashedPassword) {
        return res.status(401).json({
          success: false,
          message: "Eamil or password is incorrect ",
        });
      }
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
        expiresIn: "30d",
      });
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      return res.status(200).json({
        success: true,
        message: "Login Successfully",
      });
    }
    return res.status(404).json({
      success: false,
      message: "Email doesn't exist",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const GetCookie = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(200).json({
        message: "User is not loged in",
        success: false,
      });
    }

    const { id } = jwt.verify(token, process.env.JWT_SECRET!);
    if (id) {
      const user = await prisma.user.findFirst({
        where: {
          id: id,
        },
      });
      return res.status(200).json({
        success: true,
        token,
        user,
      });
    }
  } catch (error) {
    return res.status(500).json("Internal server error");
  }
};

export const SignOut = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server Error",
    });
  }
};

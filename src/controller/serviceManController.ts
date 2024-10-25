import { Request, Response } from "express";
import prisma from "../config/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const ServiceManSignUp = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      password,
      phoneNo,
      services,
      profileUrl,
      workingPhoneNo,
    } = req.body;
  
    if (
      !name ||
      !email ||
      !password ||
      !phoneNo ||
      !services ||
      !profileUrl ||
      !workingPhoneNo
    ) {
      return res.status(422).json({
        success: false,
        message: "Please enter all fields",
      });
    }

    let userEmail = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    let serviceManEmail = await prisma.serviceMan.findFirst({
      where: {
        email: email,
      },
    });
    let userNo = await prisma.user.findFirst({
      where: {
        phoneNo: phoneNo,
      },
    });
    let serviceManNO = await prisma.serviceMan.findFirst({
      where: {
        phoneNo: phoneNo,
      },
    });

    if (userEmail || serviceManEmail) {
      return res.status(422).json({
        success: false,
        message: "User already exist with this email  ",
      });
    }
    if (userNo || serviceManNO) {
      return res.status(422).json({
        success: false,
        message: "User already exist with this Phone Number ",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    await prisma.serviceMan.create({
      data: {
        name: name,
        email: email,
        password: hashPassword,
        phoneNo: phoneNo,
        profileUrl: profileUrl,
        services: services,
        workingPhoneNo: workingPhoneNo,
      },
    });

    return res.status(200).json({
      success: true,
      message: "SignUp successfully",
    });
  } catch (error) {
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

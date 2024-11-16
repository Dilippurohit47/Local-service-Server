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
      city,
      country,
      state,
      pincode,
    } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      !phoneNo ||
      !services ||
      !profileUrl ||
      !workingPhoneNo ||
      !city ||
      !country ||
      !state
    ) {
      return res.status(422).json({
        success: false,
        message: "Please enter all fields",
      });
    }

    let parsedServices = services ? JSON.parse(services) : [];

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
    const data = await fetch(
      `https://geocode.maps.co/search?q=${country}%20${state}%20${city}&api_key=6738a0c177bd4019266980jofb0d17b`
    );
    const latLong = await data.json();
    await prisma.serviceMan.create({
      data: {
        name: name,
        email: email,
        password: hashPassword,
        phoneNo: phoneNo,
        profileUrl: profileUrl,
        services: parsedServices,
        workingPhoneNo: workingPhoneNo,
        city,
        country,
        state,
        pincode,
        latitude: latLong[0].lat,
        longitude: latLong[0].lon,
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

    if (!email || !password) {
      return res.status(401).json({
        success: false,
        message: "Please enter all fields ",
      });
    }

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
          success: false,
          message: "Eamil or password is incorrect ",
        });
      }
      const token = jwt.sign(
        { id: serviceMan.id, userType: "serviceMan" },
        process.env.JWT_SECRET!,
        { expiresIn: "30d" }
      );
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
      message: "Email doesn't exist signup first",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

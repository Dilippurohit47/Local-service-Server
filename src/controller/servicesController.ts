import prisma from "../config/database.js";
import { Request, Response } from "express";

export const getAllServices = async (req: Request, res: Response) => {
  try {
    const services = await prisma.serviceMan.findMany();

    return res.status(200).json({
      success: true,
      data: services,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
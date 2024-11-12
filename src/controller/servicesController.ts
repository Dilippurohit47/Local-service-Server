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
export const getServiceWithName = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const search = name.toLowerCase();
    const services = await prisma.serviceMan.findMany();
    const matchedServices = [];
    services.forEach((service) => {
      if (service.services.some((svc) => svc.toLowerCase().includes(search))) {
        matchedServices.push(service);
      }
    });

    return res.status(200).json({
      success: true,
      data: matchedServices,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

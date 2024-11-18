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
      if (
        service.services.some((svc) =>
          svc?.value.toLowerCase().includes(search)
        )
      ) {
        matchedServices.push(service);
      }
    });

    if (matchedServices.length <= 0) {
      return res.status(200).json({
        success: false,
        message: "Sorry No services Found",
      });
    }

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
import { Request, Response } from "express";
import { handleError } from "../utils/errorHelper.js";

export const getClosestService = async (req: Request, res: Response) => {
  try {
    const { lat, long, country } = req.params;

    const latitude = parseFloat(lat);
    const longitude = parseFloat(long);

    if (isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({
        success: false,
        message: "Invalid latitude or longitude provided.",
      });
    }

    const countryServices = await prisma.serviceMan.findMany({
      where: {
        country: country,
      },
    });

    if (countryServices.length <= 0) {
      return res.status(404).json({
        success: false,
        message:
          "No services available in your country. Kindly change your country.",
      });
    }

    const calculateDistance = (
      lat1: number,
      lon1: number,
      lat2: number,
      lon2: number
    ) => {
      const R = 6371;
      const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

      const dLat = toRadians(lat2 - lat1);
      const dLon = toRadians(lon2 - lon1);

      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) *
          Math.cos(toRadians(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      return R * c; // Distance in km
    };

    // Add distance to each service and sort
    const sortedServices = countryServices
      .map((service) => ({
        ...service,
        distance: calculateDistance(
          latitude,
          longitude,
          parseFloat(service.latitude),
          parseFloat(service.longitude)
        ),
      }))
      .sort((a, b) => a.distance - b.distance);

    return res.status(200).json({
      success: true,
      message: "Closest services found successfully.",
      services: sortedServices,
    });
  } catch (error) {
    console.error("Error fetching closest services:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const getServicesWithId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      return handleError(
        res,
        400,
        false,
        "id is not valid. Id should be number"
      );
    }
    const ServiceDetails = await prisma.serviceMan.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!ServiceDetails) {
      return handleError(res, 404, false, "Service not found");
    }
    return res.status(200).json({
      success: true,
      message: "Service with id found successfully.",
      ServiceDetails,
    });
  } catch (error) {
    return handleError(res, 500,true,"Internal server error.");
  }
};

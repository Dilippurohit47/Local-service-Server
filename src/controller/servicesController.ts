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
      if (service.services.some((svc) =>svc.toLowerCase().includes(search))) {
        matchedServices.push(service);
      }
    }); 
 
    console.log("match", matchedServices); 
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

// [
//   [1]   {
//   [1]     id: 11,
//   [1]     name: 'don',
//   [1]     email: 'test2@gmail.com',
//   [1]     phoneNo: '9328197347',
//   [1]     password: '$2b$10$p5Q4qW9tIoUe97xYRnE15.T2GPSlAwXtsu/TcIhiXNQ0ALMYX7wem',
//   [1]     profileUrl: 'https://res.cloudinary.com/dfzmam9tn/image/upload/v1729858177/ncpunhghvn5mk3w03cpi.jpg',
//   [1]     services: [ 'plumber', 'electricain' ],
//   [1]     workingPhoneNo: '9328197347'
//   [1]   },
//   [1]   {
//   [1]     id: 12,
//   [1]     name: 'Dilip Purohit',
//   [1]     email: 'test1@gmail.com',
//   [1]     phoneNo: '9328127347',
//   [1]     password: '$2b$10$oRgTcRaiUh.wy5Ho0qwyAuAHQeVBmqmqWcjyLzTz.eMb4cnukGU/m',
//   [1]     profileUrl: 'https://res.cloudinary.com/dfzmam9tn/image/upload/v1730008799/da80rjv1vvpq6estpskv.jpg',
//   [1]     services: [ 'plumber', 'electricain' ],
//   [1]     workingPhoneNo: '9328127347'
//   [1]   },
//   [1]   {
//   [1]     id: 13,
//   [1]     name: 'kareena kapoor',
//   [1]     email: 'kareena@gmail.com',
//   [1]     phoneNo: '1234567888',
//   [1]     password: '$2b$10$7MEszkX4w/UBY/QJ1394.OvUJ.VyWFIVQ0yAUl1x2Uykfd43o0n1G',
//   [1]     profileUrl: 'https://res.cloudinary.com/dfzmam9tn/image/upload/v1730029093/opxoapwvssp1dvebgvx3.jpg',
//   [1]     services: [ 'House', 'wife' ],
//   [1]     workingPhoneNo: '1234567888'
//   [1]   },
//   [1]   {
//   [1]     id: 14,
//   [1]     name: 'carry',
//   [1]     email: 'carry@gmail.com',
//   [1]     phoneNo: '1234567777',
//   [1]     password: '$2b$10$e.rZOUnBoevVW.07aEsgtu.GI22kOnJ1eJGEYFLiHGiTHC8XajMfq',
//   [1]     profileUrl: 'https://res.cloudinary.com/dfzmam9tn/image/upload/v1730029741/qb56kl5uxi0vv8e0dcit.jpg',
//   [1]     services: [ 'Care', 'Taker' ],
//   [1]     workingPhoneNo: '1234567777'
//   [1]   },
//   [1]   {
//   [1]     id: 15,
//   [1]     name: 'Rohit Purohit',
//   [1]     email: 'rohit@gmail.com',
//   [1]     phoneNo: '1234567899',
//   [1]     password: '$2b$10$Xg/OWOaseF4fy9CKseV5GO0cRWoT4it/GmYi64bjenQmjkyVaDOEC',
//   [1]     profileUrl: 'https://res.cloudinary.com/dfzmam9tn/image/upload/v1730731902/cfbg2ktkdioubiyudvtd.jpg',
//   [1]     services: [],
//   [1]     workingPhoneNo: '1234567899'
//   [1]   }
//   [1] ]

import express from "express";
import {
  getAllServices,
  getServicesWithPincode,
  getServiceWithName,
} from "../controller/servicesController.js";

const app = express.Router();

app.get("/getAll", getAllServices);
app.get("/get/:name", getServiceWithName);
app.get("/getWithCode/:pincode", getServicesWithPincode);

export default app; 

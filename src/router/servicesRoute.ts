import express from "express";
import {
  getAllServices,
  getClosestService,
  getServiceWithName,
} from "../controller/servicesController.js";

const app = express.Router();

app.get("/getAll", getAllServices);
app.get("/get/:name", getServiceWithName);
app.get("/get-close-services/:lat/:long/:country", getClosestService);

export default app; 

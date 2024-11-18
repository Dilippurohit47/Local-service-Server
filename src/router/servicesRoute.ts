import express from "express";
import {
  getAllServices,
  getClosestService,
  getServicesWithId,
  getServiceWithName,
} from "../controller/servicesController.js";

const app = express.Router();

app.get("/getAll", getAllServices);
app.get("/get/:name", getServiceWithName);
app.get("/get-close-services/:lat/:long/:country", getClosestService);
app.get("/get-with-id/:id", getServicesWithId);

export default app;

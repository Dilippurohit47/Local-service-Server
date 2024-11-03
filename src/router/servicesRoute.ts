import express from "express";
import {
  getAllServices,
  getServiceWithName,
} from "../controller/servicesController.js";

const app = express.Router();

app.get("/getAll", getAllServices);
app.get("/get/:name", getServiceWithName);

export default app;

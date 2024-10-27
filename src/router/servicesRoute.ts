import express from "express";
import { getAllServices } from "../controller/servicesController.js";


const app = express.Router()

app.get("/getAll",getAllServices)


export default app
import { Router } from "express";
import { SignIn } from "../controller/authController.js";
const app = Router();
app.post("/sign-in", SignIn);
export default app;

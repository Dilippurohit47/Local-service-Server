import { Router } from "express";
import { SignIn, SignUp } from "../controller/authController.js";
const app = Router();
app.post("/sign-up", SignUp);
app.post("/sign-in", SignIn);
export default app;

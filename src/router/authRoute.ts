import { Router } from "express";
import { SignIn, SignUp } from "../controller/authController.js";
import {
  ServiceManSignUp,
  ServiceManSignIn,
} from "../controller/serviceManController.js";
const app = Router();
app.post("/user/sign-up", SignUp);
app.post("/user/sign-in", SignIn);
app.post("/service/sign-up", ServiceManSignUp);
app.post("/service/sign-in", ServiceManSignIn);
export default app;

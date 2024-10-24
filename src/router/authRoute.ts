import { Router } from "express";
import { GetCookie, SignIn, SignOut, SignUp } from "../controller/authController.js";
import {
  ServiceManSignUp,
  ServiceManSignIn,
} from "../controller/serviceManController.js";
const app = Router();
app.post("/user/sign-up", SignUp);
app.get("/user/cookie", GetCookie);
app.post("/user/sign-out", SignOut);
app.post("/user/sign-in", SignIn);
app.post("/service/sign-up", ServiceManSignUp);
app.post("/service/sign-in", ServiceManSignIn);
export default app;

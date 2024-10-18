import express, { Request, Response } from "express";
import dotenv from "dotenv";
import userRoutes from "./router/authRoute.js";
dotenv.config();
const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json())
app.get("/", (req: Request, res: Response) => {
  res.send("server is running!");
});

app.use("/user", userRoutes); 

app.listen(PORT, () =>
  console.log(`server is running on port http://localhost:${PORT}`)
);

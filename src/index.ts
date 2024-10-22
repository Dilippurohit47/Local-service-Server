import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./router/authRoute.js";
dotenv.config();
const app = express();

const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.send("server is running!");
});

app.use("/api/v1", userRoutes);
app.use("/api/v1", userRoutes);

app.listen(PORT, () =>
  console.log(`server is running on port http://localhost:${PORT}`)
);

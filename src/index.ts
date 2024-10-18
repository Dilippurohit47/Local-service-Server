import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();

const PORT = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response) => {
  res.send("server is running!");
});

app.listen(PORT, () =>
  console.log(`server is running on port http://localhost:${PORT}`)
);

import express from "express";
import bodyParser from "body-parser";
import studentRouter from "./routes/studentroute.js";
import dotenv from "dotenv";
import connectDB from "./config/config.js";

dotenv.config();

connectDB();
const app = express();

app.use(bodyParser.json());
app.use("/student", studentRouter);
app.listen(3000, () => {
  console.log("listening at port 3000");
});

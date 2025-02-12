import * as express from "express";
import * as cors from "cors";
import * as dotenv from "dotenv";
import connectDB from "./config/db";
import apiRoutes from "./routes";
import errorHandler from "./middleware/error.middleware";

dotenv.config();

const app = express();
// อนุญาตให้ทุกโดเมนเข้าถึง API
app.use(
  cors({
    origin: "*", // อนุญาตทุกต้นทาง (IP หรือโดเมน)
    methods: ["GET", "POST", "PUT", "DELETE"], // อนุญาตเฉพาะบาง method
    // allowedHeaders: ["Content-Type", "Authorization"], // อนุญาตเฉพาะบาง header
  })
);
// app.use(
//   cors({
//     origin: ["http://example.com", "http://localhost:3000"],
//   })
// );

app.get("/", (req, res) => {
  res.send("CORS Enabled for All Origins!");
});
app.use(express.json());

app.use("/api", apiRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

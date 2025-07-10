import mongoose from "mongoose";
import * as dotenv from "dotenv";
import categoryService from "../services/category.service";

dotenv.config();

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    isConnected = true;
    console.log("MongoDB Connected");
    await categoryService.seedCategories();
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;

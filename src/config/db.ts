import mongoose from "mongoose";
import * as dotenv from "dotenv";
import categoryService from "../services/category.service";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("MongoDB Connected...");
    await categoryService.seedCategories();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;

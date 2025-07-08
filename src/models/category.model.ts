import mongoose, { Schema, Document } from "mongoose";
import { number } from "zod";

export interface CategoryType {
  name: string;
  name_th: string;
  icon?: string;
  color?: string;
  priority?: number;
}

export interface ICategory extends Document {
  name: string;
  name_th: string;
  icon?: string;
  color?: string;
  priority?: number;
}

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true, unique: true },
  name_th: { type: String, required: true, unique: true },
  icon: { type: String },
  color: { type: String },
  priority: { type: Number },
});

export default mongoose.model<ICategory>("Category", CategorySchema);

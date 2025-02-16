import mongoose, { Schema, Document } from "mongoose";

export interface CategoryType {
  name: string;
  name_th: string;
  icon?: string;
  color?: string;
}

export interface ICategory extends Document {
  name: string;
  name_th: string;
  icon?: string;
  color?: string;
}

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true, unique: true },
  name_th: { type: String, required: true, unique: true },
  icon: { type: String },
  color: { type: String },
});

export default mongoose.model<ICategory>("Category", CategorySchema);

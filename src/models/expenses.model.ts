import mongoose, { Schema, Document } from "mongoose";

export interface IExpense extends Document {
  user: mongoose.Types.ObjectId; // อ้างอิงไปยัง User
  amount: number; // จำนวนเงินที่จ่าย
  category: mongoose.Types.ObjectId; // อ้างอิงไปยังหมวดหมู่
  description?: string; // คำอธิบายเพิ่มเติม
  date: Date; // วันที่บันทึก
  createdAt: Date;
  updatedAt: Date;
}

const ExpenseSchema = new Schema<IExpense>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    description: { type: String },
    date: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model<IExpense>("Expense", ExpenseSchema);

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export async function connectDB() {
  try {
    const db = await mongoose.connect(process.env.SERVER);
    console.log("connected to", db.connection.name);
  } catch (error) {
    console.log(error);
  }
}

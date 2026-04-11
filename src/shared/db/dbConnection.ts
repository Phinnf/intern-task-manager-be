import mongoose from "mongoose";
import "dotenv/config";

export default async function connectToDatabase() {
  try {
    const mongoUrl = process.env.MONGODB_URL;
    const dbConnection = await mongoose.connect(`${mongoUrl}`)
    console.log(`MongoDB Connected: ${dbConnection.connection.host}`)
  } catch (error) {
    console.error("Could not connect to database", error);
    process.exit(1);
  }
}

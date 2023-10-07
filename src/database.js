import mongoose from "mongoose";

import { MONGODB_URI } from "./config.js";

const connectDB = async () => {
  try {
    const dbUri = MONGODB_URI;
    await mongoose.createConnection(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;

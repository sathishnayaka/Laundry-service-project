const mongoose = require("mongoose");
require("dotenv").congif()

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
    });
  } catch {}
};

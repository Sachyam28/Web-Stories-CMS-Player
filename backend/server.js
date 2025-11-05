require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require("./routes/auth");

const app = express();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(cors({
  origin: process.env.FRONTEND_URL || '*'
}));
app.use("/api/auth", authRoutes);
app.use("/api/stories", require("./routes/stories"));

// Routes
app.get("/", (req, res) => {
  res.send("Webstories backend is working ✅");
});

// Connect to MongoDB
let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected');
    isConnected = true;
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
  }
}

// Export as serverless function
module.exports = async (req, res) => {
  await connectDB();
  app(req, res);
};

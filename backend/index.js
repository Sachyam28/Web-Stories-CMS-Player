require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require("./routes/auth");
const storiesRoutes = require("./routes/stories");

const app = express();

//  CORS for frontend
app.use(
  cors({
    origin: [
      'https://web-stories-cms-f8qf.vercel.app', // your frontend
      'http://localhost:5173',         
      'https://web-stories-cms-player.vercel.app'          // optional for local dev
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  })
);

app.options('*', cors());


//  Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

//  Routes
app.use("/api/auth", authRoutes);
app.use("/api/stories", storiesRoutes);

app.get("/", (req, res) => {
  res.send("Webstories backend is working ");
});

//  Connect MongoDB once
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // 10s timeout
    });
    console.log(" MongoDB connected");
  } catch (error) {
    console.error(" MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

connectDB();


//  DO NOT app.listen() on Vercel
// app.listen(PORT)  REMOVE

module.exports = app;

import 'dotenv/config';

import connectCloudinary from './config/cloudinary.js';
import connectDB from './config/mongodb.js';
import cors from 'cors';
import express from 'express';

// add config for CORS
const app = express()
const port = process.env.PORT || 4000;
connectDB()
connectCloudinary();

// Middleware
app.use(express.json());
app.use(cors());

// API endpoint
app.get('/', (req, res) => {
  res.send('API is running');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
import 'dotenv/config';

import cartRouter from './routes/cartRoute.js';
import connectCloudinary from './config/cloudinary.js';
import connectDB from './config/mongodb.js';
import cors from 'cors';
import express from 'express';
import productRouter from './routes/productRoute.js';
import userRouter from './routes/userRoute.js';

// add config for CORS
const app = express()
const port = process.env.PORT || 4000;
connectDB()
connectCloudinary();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(cors());

// API endpoints
app.use('/api/user', userRouter); // User routes
app.use('/api/product', productRouter); // Product routes
app.use('/api/cart', cartRouter)

// API endpoint
app.get('/', (req, res) => {
  res.send('API is running');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
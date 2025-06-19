import { addToCart, getUserCart, updateCart } from '../controllers/cartController';

import authUser from '../middleware/auth';
import express from 'express';

const cartRouter = express.Router();

// Route to add a product to the user's cart
cartRouter.post('/add', authUser, addToCart);

// Route to update the user's cart
cartRouter.post('/update', authUser, updateCart);

// Route to get the user's cart data
cartRouter.post('/get', authUser, getUserCart);

export default cartRouter;
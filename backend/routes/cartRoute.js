import { addToCart, getUserCart, updateCart } from '../controllers/cartController';

import express from 'express';

const cartRouter = express.Router();

// Route to add a product to the user's cart
cartRouter.post('/add', addToCart);

// Route to update the user's cart
cartRouter.post('/update', updateCart);

// Route to get the user's cart data
cartRouter.post('/get', getUserCart);

export default cartRouter;
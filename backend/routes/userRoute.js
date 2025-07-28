import { adminLogin, changePassword, deleteAccount, getUserProfile, loginUser, registerUser, updateUserProfile } from '../controllers/userController.js';

import authUser from '../middleware/auth.js';
import express from 'express';

const userRouter = express.Router();

userRouter.post('/login', loginUser);
userRouter.post('/register', registerUser);
userRouter.post('/admin', adminLogin);

// Test route to verify routing is working
userRouter.get('/test', (req, res) => {
    res.json({ success: true, message: 'User routes are working' });
});

// Profile routes (require authentication)
userRouter.get('/profile', authUser, getUserProfile);
userRouter.post('/update-profile', authUser, updateUserProfile);
userRouter.post('/change-password', authUser, changePassword);
userRouter.post('/delete-account', authUser, deleteAccount);

export default userRouter;
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import validator from 'validator';

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

// Route for user login
const loginUser = async (req, res) => {
    try {
        // console.log('Login request body:', req.body);
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({success: false, message: 'Email and password are required'});
        }

        const user = await userModel.findOne({ email });
        
        if (!user) {
            return res.json({success: false, message: 'User not found'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if (isMatch) {
            const token = createToken(user._id);
            res.json({success: true, token});
        } else {
            res.json({success: false, message: 'Invalid credentials'});
        }

    } catch (error) {
        console.error('Error logging in user:', error);
        res.json({success: false, message: error.message});
    }
}

// Route for user registration
const registerUser = async (req, res) => {
    try {
        console.log('Register request body:', req.body); // Debug log
        console.log('Content-Type:', req.headers['content-type']); // Debug log
        
        const { name, email, password, firstName, lastName } = req.body;

        // Check if required fields are present
        if (!name || !email || !password) {
            return res.json({
                success: false, 
                message: 'Name, email, and password are required'
            });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({email});

        if (existingUser) {
            return res.json({success: false, message: 'User already exists'});
        }

        // validating email format and strong password
        if (!validator.isEmail(email)) {
            return res.json({success: false, message: 'Please enter a valid email address'});
        }

        if (password.length < 8) {
            return res.json({success: false, message: 'Please enter a strong password with at least 8 characters'});
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            firstName: firstName || '',
            lastName: lastName || ''
        });

        const user = await newUser.save(); // Save the user to the database

        const token = createToken(user._id);

        res.json({success:true, token });

    } catch (error) {
        console.error('Error registering user:', error);
        res.json({success: false, message: error.message});
    }
}

// Route for admin login
const adminLogin = async (req, res) => {
    try {
        console.log('Admin login request body:', req.body);
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({success: true, token});
        } else {
            res.json({success: false, message: 'Invalid admin credentials'});
        }

    } catch (error) {
        console.error('Error in admin login:', error);
        res.json({success: false, message: error.message});
    }
}

// Route to get user profile
const getUserProfile = async (req, res) => {
    try {
        const { userId } = req.body; // This comes from authUser middleware
        
        if (!userId) {
            return res.json({ success: false, message: 'User ID is required' });
        }
        
        const user = await userModel.findById(userId).select('-password -cartData');
        
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }
        
        if (!user.isActive) {
            return res.json({ success: false, message: 'Account is deactivated' });
        }
        
        res.json({ success: true, user });
        
    } catch (error) {
        console.error('Error getting user profile:', error);
        res.json({ success: false, message: error.message });
    }
}

// Route to update user profile
const updateUserProfile = async (req, res) => {
    try {
        const { userId } = req.body;
        const {
            firstName,
            lastName,
            email,
            houseNo,
            street,
            city,
            district,
            province,
            postalCode,
            phoneNumber
        } = req.body;
        
        // Check if user exists
        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }
        
        if (!user.isActive) {
            return res.json({ success: false, message: 'Account is deactivated' });
        }
        
        // Validate email if it's being changed
        if (email && email !== user.email) {
            if (!validator.isEmail(email)) {
                return res.json({ success: false, message: 'Please enter a valid email address' });
            }
            
            // Check if email is already taken
            const existingUser = await userModel.findOne({ email, _id: { $ne: userId } });
            if (existingUser) {
                return res.json({ success: false, message: 'Email is already taken' });
            }
        }
        
        // Update user profile
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            {
                firstName: firstName || user.firstName,
                lastName: lastName || user.lastName,
                email: email || user.email,
                houseNo: houseNo || user.houseNo,
                street: street || user.street,
                city: city || user.city,
                district: district || user.district,
                province: province || user.province,
                postalCode: postalCode || user.postalCode,
                phoneNumber: phoneNumber || user.phoneNumber
            },
            { new: true }
        ).select('-password -cartData');
        
        res.json({ success: true, message: 'Profile updated successfully', user: updatedUser });
        
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.json({ success: false, message: error.message });
    }
}

// Route to change password
const changePassword = async (req, res) => {
    try {
        const { userId } = req.body;
        const { currentPassword, newPassword } = req.body;
        
        if (!currentPassword || !newPassword) {
            return res.json({ success: false, message: 'Current password and new password are required' });
        }
        
        // Find user
        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }
        
        if (!user.isActive) {
            return res.json({ success: false, message: 'Account is deactivated' });
        }
        
        // Verify current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: 'Current password is incorrect' });
        }
        
        // Validate new password
        if (newPassword.length < 8) {
            return res.json({ success: false, message: 'New password must be at least 8 characters long' });
        }
        
        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);
        
        // Update password
        await userModel.findByIdAndUpdate(userId, { password: hashedNewPassword });
        
        res.json({ success: true, message: 'Password changed successfully' });
        
    } catch (error) {
        console.error('Error changing password:', error);
        res.json({ success: false, message: error.message });
    }
}

// Route to delete account (soft delete)
const deleteAccount = async (req, res) => {
    try {
        const { userId } = req.body;
        
        // Find user
        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }
        
        // Soft delete - set isActive to false and deletedAt timestamp
        await userModel.findByIdAndUpdate(userId, {
            isActive: false,
            deletedAt: new Date()
        });
        
        res.json({ success: true, message: 'Account deleted successfully' });
        
    } catch (error) {
        console.error('Error deleting account:', error);
        res.json({ success: false, message: error.message });
    }
}

export { loginUser, registerUser, adminLogin, getUserProfile, updateUserProfile, changePassword, deleteAccount };
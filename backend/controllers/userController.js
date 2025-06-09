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
        
        const { name, email, password } = req.body;

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
            password: hashedPassword
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

export { loginUser, registerUser, adminLogin };
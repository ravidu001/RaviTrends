import jwt from 'jsonwebtoken';
import { response } from 'express';
const authUser = async (req,res,next) => {
    
    const token = req.headers.token;

    if (!token) {
        return res.json({ success:false, message: 'Not Authorized Login Again'})
    }

    try {

        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        
        // Ensure req.body exists for both GET and POST requests
        if (!req.body) {
            req.body = {};
        }
        
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    } 
}

export default authUser;
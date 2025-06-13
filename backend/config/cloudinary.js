import { v2 as cloudinary } from 'cloudinary';

const connectCloudinary = async () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });

        // Test the configuration
        console.log('Cloudinary configured successfully');
        console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
        console.log('API Key:', process.env.CLOUDINARY_API_KEY ? 'Present' : 'Missing');
        console.log('API Secret:', process.env.CLOUDINARY_API_SECRET ? 'Present' : 'Missing');
        
    } catch (error) {
        console.error('Cloudinary configuration error:', error);
    }
}

export default connectCloudinary;
import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1); // stop the server if DB connection fails
    }
};

export default connectDB;

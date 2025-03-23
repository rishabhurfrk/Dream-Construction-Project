const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        console.log('MongoDB URI:', process.env.MONGO_URI); // Debug log
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        
        // Test the connection by counting users
        const User = require('../models/User');
        const userCount = await User.countDocuments();
        console.log(`Total users in database: ${userCount}`);
        
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB; 
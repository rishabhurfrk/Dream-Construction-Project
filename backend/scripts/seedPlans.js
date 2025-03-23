const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const Plan = require('../models/Plan');

const samplePlans = [
  {
    name: "200x200 Modern House",
    plotLength: 200,
    plotWidth: 200,
    floors: 1,
    bedrooms: 2,
    washrooms: 1,
    additionalRooms: ['living-room', 'kitchen'],
    parking: '1-car',
    imageUrl: '/images/plans/200sq ft house-plan.jpg',
    price: 150000,
    style: 'modern',
    description: "Perfect for small families"
  },
  {
    name: "400x400 Family Villa",
    plotLength: 400,
    plotWidth: 400,
    floors: 2,
    bedrooms: 4,
    washrooms: 3,
    additionalRooms: ['living-room', 'dining-room', 'kitchen', 'study-room'],
    parking: '2-car',
    imageUrl: '/images/plans/400sqt house plan.jpg',
    price: 350000,
    style: 'contemporary',
    description: "Spacious family home"
  },
  {
    name: "600x600 Luxury Mansion",
    plotLength: 600,
    plotWidth: 600,
    floors: 3,
    bedrooms: 6,
    washrooms: 5,
    additionalRooms: ['living-room', 'dining-room', 'kitchen', 'study-room', 'puja-room'],
    parking: 'more',
    imageUrl: '/images/plans/600sqft house plan.jpg',
    price: 750000,
    style: 'traditional',
    description: "Premium luxury residence"
  }
];

async function seedDatabase() {
  try {
    const uri = process.env.MONGO_URI;
    
    if (!uri) {
      throw new Error('MONGO_URI environment variable is not defined');
    }

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      retryWrites: true,
      w: 'majority'
    });

    console.log('Connected to MongoDB successfully');
    
    // Clear existing plans
    await Plan.deleteMany({});
    console.log('Cleared existing plans');
    
    // Insert sample plans
    await Plan.insertMany(samplePlans);
    console.log('Sample plans inserted successfully');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

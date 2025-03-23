const mongoose = require('mongoose');

const PlanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  plotLength: {
    type: Number,
    required: true
  },
  plotWidth: {
    type: Number,
    required: true
  },
  floors: {
    type: Number,
    required: true
  },
  bedrooms: {
    type: Number,
    required: true
  },
  washrooms: {
    type: Number,
    required: true
  },
  additionalRooms: [{
    type: String,
    enum: ['living-room', 'dining-room', 'kitchen', 'study-room', 'puja-room']
  }],
  parking: {
    type: String,
    enum: ['none', '1-car', '2-car', 'more']
  },
  imageUrl: {
    type: String,
    required: true
  },
  description: String,
  price: Number,
  style: {
    type: String,
    enum: ['modern', 'traditional', 'contemporary', 'minimalist']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  collection: 'ImageDatabase'  // Specify the collection name
});

module.exports = mongoose.model('Plan', PlanSchema);

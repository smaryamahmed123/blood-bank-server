// DonorSchema.js

import mongoose from 'mongoose';

const donorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    required: true,
  },
  contactInfo: {
    type: String,
    required: true,
    // Add custom validation if needed
  },
  messages: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Store the path to the uploaded image
    required: true
  },
});

const Donor = mongoose.model('Donor', donorSchema);

export default Donor;

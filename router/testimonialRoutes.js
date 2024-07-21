import express from 'express';
import Testimonial from '../module/testimonialSchema.js';

const router = express.Router();

// Get all testimonials
router.get('/user', async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

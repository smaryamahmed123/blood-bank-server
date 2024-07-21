import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Testimonial from './module/testimonialSchema.js';

dotenv.config(); // Load environment variables from .env file


const testimonials = [
  {
    img: 'Images/img1.jpg',
    message: "I'm grateful for the blood transfusion that saved my life. Thank you to all donors!",
    name: 'Emily Johnson'
  },
  {
    img: 'Images/img2.jpg',
    message: "Donating blood was a fulfilling experience. I'm happy to help others in need.",
    name: 'John Doe'
  },
  {
    img: 'Images/img3.jpg',
    message: "Receiving blood was a lifesaver for me. Thank you to the generous donors!",
    name: 'Jane Smith'
  },
  {
    img: 'Images/img4.jpg',
    message: "I'm honored to be a regular blood donor. Knowing that my blood can save lives is incredibly rewarding.",
    name: 'Michael Brown'
  },
  {
    img: 'Images/img5.jpg',
    message: "A blood donation gave my father a second chance at life. We are forever grateful.",
    name: 'Linda Wilson'
  },
  {
    img: 'Images/img7.jpg',
    message: "It's amazing how such a simple act of donating blood can make a huge difference in someone's life.",
    name: 'Robert Taylor'
  },
  {
    img: 'Images/img8.jpg',
    message: "Thanks to blood donors, I was able to recover from a serious surgery. Your kindness means everything.",
    name: 'Susan Lee'
  },
  {
    img: 'Images/img9.jpg',
    message: "Giving blood is a small effort that brings immense satisfaction knowing you're saving lives.",
    name: 'David Jones'
  },
  {
    img: 'Images/img10.jpg',
    message: "Blood donations are a lifeline. I'm alive today because of the generosity of donors.",
    name: 'Nancy White'
  },
  {
    img: 'https://example.com/images/james-harris.jpg',
    message: "Every drop counts. I'm proud to contribute and help those in need of blood.",
    name: 'James Harris'
  }
];

const mongoUri = process.env.MongoDB_URL;

mongoose.connect(mongoUri)
  .then(async () => {
    await Testimonial.insertMany(testimonials);
    console.log('Testimonials inserted successfully');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Error inserting testimonials:', err);
  });

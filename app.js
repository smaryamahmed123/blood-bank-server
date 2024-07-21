// app.js

import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import path from 'path';
import fs from 'fs';
import router from './router/auth-router.js';
import contactRouter from './router/contact-router.js';
import DonerRouter from './router/Doner-router.js';
import mongoDB from './utiles/db.js';
import cors from 'cors';
import testimonialRoutes from './router/testimonialRoutes.js';
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Parse JSON bodies
// app.use(cors()); // Enable CORS
app.use(cors({
  origin: 'https://mellifluous-madeleine-b83366.netlify.app', // Update with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Ensure the 'uploads' directory exists on server startup
const ensureUploadsDirExists = () => {
  const uploadsDir = path.resolve('uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
};

ensureUploadsDirExists();

app.get('/', (req, res) => {
  res.send('Backend is running');
});

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));
app.use('/api/reviews', testimonialRoutes);
app.use('/api/auth', router); // Routes for authentication
app.use('/api/form', contactRouter); // Routes for form handling
app.use('/api/forms', DonerRouter); // Routes for donor handling

// Serve static files from the React app
const __dirname = path.dirname(new URL(import.meta.url).pathname);
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../Client/blood-bank/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../Client/blood-bank/dist', 'index.html'));
  });
}

// Connect to MongoDB and start the server
mongoDB().then(() => {
  app.listen(PORT, () => {
    console.log(`App is running on port http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

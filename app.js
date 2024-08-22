// import dotenv from 'dotenv';
// dotenv.config();
// import express from 'express';
// import path from 'path';
// import fs from 'fs';
// import router from './router/auth-router.js';
// import contactRouter from './router/contact-router.js';
// import DonerRouter from './router/Doner-router.js';
// import mongoDB from './utiles/db.js';
// import cors from 'cors';
// import testimonialRoutes from './router/testimonialRoutes.js';
// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(express.json());
// app.use(cors({
//   origin: 'https://mern-stack-blood-bank-app.netlify.app',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));


// app.use((req, res, next) => {
//   console.log(`Request received: ${req.method} ${req.url}`);
//   next();
// });

// const ensureUploadsDirExists = () => {
//   const uploadsDir = path.resolve('uploads');
//   if (!fs.existsSync(uploadsDir)) {
//     fs.mkdirSync(uploadsDir, { recursive: true });
//   }
// };

// ensureUploadsDirExists();

// app.get('/', (req, res) => {
//   res.send('Backend is running');
// });

// app.use('/uploads', express.static('uploads'));
// app.use('/api/reviews', testimonialRoutes);
// app.use('/api/auth', router);
// app.use('/api/form', contactRouter);
// app.use('/api/forms', DonerRouter);

// const __dirname = path.dirname(new URL(import.meta.url).pathname);
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../Client/blood-bank/dist')));
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../Client/blood-bank/dist', 'index.html'));
//   });
// }

// mongoDB().then(() => {
//   app.listen(PORT, () => {
//     console.log(`App is running on port http://localhost:${PORT}`);
//   });
// }).catch(err => {
//   console.error('Failed to connect to MongoDB', err);
// });








import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import path from 'path';
import cors from 'cors';
import router from './router/auth-router.js';
import contactRouter from './router/contact-router.js';
import DonerRouter from './router/Doner-router.js';
import mongoDB from './utiles/db.js';
import testimonialRoutes from './router/testimonialRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
  origin: 'https://mern-stack-blood-bank-app.netlify.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.use('/api/reviews', testimonialRoutes);
app.use('/api/auth', router);
app.use('/api/form', contactRouter);
app.use('/api/forms', DonerRouter);

const __dirname = path.dirname(new URL(import.meta.url).pathname);
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../Client/blood-bank/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../Client/blood-bank/dist', 'index.html'));
  });
}

mongoDB().then(() => {
  app.listen(PORT, () => {
    console.log(`App is running on port http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

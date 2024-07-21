// routes/donorRoutes.js

import express from 'express';
import { addDonor, getAllDonors, upload } from '../controllers/DonerControllers.js';

const DonerRouter = express.Router();

// Get all donors
DonerRouter.get('/doner', getAllDonors);

// Add a new donor
DonerRouter.post('/doner', upload.single('image'), addDonor);

export default DonerRouter;

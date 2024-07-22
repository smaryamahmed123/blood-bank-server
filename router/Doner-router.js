import express from 'express';
import { addDonor, getAllDonors, upload } from '../controllers/DonerControllers.js';

const DonerRouter = express.Router();

DonerRouter.get('/doner', getAllDonors);
DonerRouter.post('/doner', upload.single('image'), addDonor);

export default DonerRouter;

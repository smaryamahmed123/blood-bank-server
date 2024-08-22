import express from 'express';
import { addDonor, getAllDonors, upload } from '../controllers/DonerControllers.js';

const DonerRouter = express.Router();

DonerRouter.get('/doner', getAllDonors);
DonerRouter.post('/doner', addDonor);
//  upload.single('image'),
export default DonerRouter;

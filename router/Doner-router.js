import express from 'express';
import { addDonor, getAllDonors,} from '../controllers/DonerControllers.js';

const DonerRouter = express.Router();

DonerRouter.get('/doner', getAllDonors);
DonerRouter.post('/doner', addDonor);
//  upload.single('image'),
export default DonerRouter;

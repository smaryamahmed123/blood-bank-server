import express from 'express';
import multer from 'multer';
import path from 'path';
import { addDonor, getAllDonors } from '../controllers/DonerControllers.js';

const DonerRouter = express.Router();

// Multer setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

DonerRouter.get('/doner', getAllDonors);
DonerRouter.post('/doner', upload.single('image'), addDonor);

export default DonerRouter;

import express from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import AWS from 'aws-sdk';
import { addDonor, getAllDonors } from '../controllers/DonerControllers.js';

const DonerRouter = express.Router();

// AWS S3 Configuration
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

// Multer S3 setup
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_S3_BUCKET_NAME, // Ensure you set this environment variable
        acl: 'public-read', // Allows the file to be publicly accessible
        key: function (req, file, cb) {
            cb(null, `donors/${Date.now()}_${file.originalname}`);
        }
    })
});

DonerRouter.get('/doner', getAllDonors);
DonerRouter.post('/doner', upload.single('image'), addDonor);

export default DonerRouter;

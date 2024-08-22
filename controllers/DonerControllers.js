// import path from 'path';
// import multer from 'multer';
// import fs from 'fs';
// import Donor from '../module/DonerSchema.js';
// import validator from 'validator';

// // Ensure the 'uploads' directory exists
// // const ensureUploadsDirExists = () => {
// //   const uploadsDir = path.resolve('uploads');
// //   if (!fs.existsSync(uploadsDir)) {
// //     fs.mkdirSync(uploadsDir, { recursive: true });
// //   }
// // };

// // Multer configuration
// // const storage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //     ensureUploadsDirExists(); // Ensure 'uploads' directory exists
// //     cb(null, 'uploads/'); // Directory where uploaded files will be stored
// //   },
// //   filename: function (req, file, cb) {
// //     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
// //     cb(null, uniqueSuffix + path.extname(file.originalname)); // Generate unique filename
// //   }
// // });

// // const fileFilter = (req, file, cb) => {
// //   if (file.mimetype.startsWith('image/')) {
// //     cb(null, true);
// //   } else {
// //     cb(new Error('Invalid file type. Only image files are allowed.'));
// //   }
// // };

// // export const upload = multer({ storage, fileFilter });  

// // Controller to add a new donor with image upload
// // export const addDonor = async (req, res) => {
// //   const { name, bloodGroup, contactInfo, messages } = req.body;

// //   try {
// //     // Validate phone number format
// //     if (!validator.isMobilePhone(contactInfo, 'any')) {
// //       return res.status(400).json({ valid: false, message: 'Invalid phone number format.' });
// //     }

// //     let image = '';
// //     if (req.file) {
// //       image = req.file.path; // Save the path to the uploaded image
// //     } else {
// //       return res.status(400).json({ message: 'Image is required.' });
// //     }

// //     // Create new donor instance
// //     const donor = new Donor({ name, bloodGroup, contactInfo, messages, image });

// //     // Save donor to database
// //     const newDonor = await donor.save();
// //     res.status(201).json(newDonor);
// //   } catch (error) {
// //     console.error('Error registering donor:', error);
// //     res.status(500).json({ message: 'Internal server error', error: error.message });
// //   }
// // };
// export const addDonor = async (req, res) => {
//   const { name, bloodGroup, contactInfo, messages } = req.body;
//   console.log('Received data:', req.body);

//   try {
//     console.log('Received data:', req.body);
//     // console.log('Received file:', req.file);
//     if (!validator.isMobilePhone(contactInfo, 'any')) {
//       return res.status(400).json({ valid: false, message: 'Invalid phone number format.' });
//     }

//     // let image = '';
//     // if (req.file) {
//     //   image = req.file.path;
//     //   console.log('Image uploaded:', image);
//     // } else {
//     //   return res.status(400).json({ message: 'Image is required.' });
//     // }

//     const donor = new Donor({ name, bloodGroup, contactInfo, messages, });
//     console.log('Saving donor:', donor);

//     const newDonor = await donor.save();
//     console.log('Donor saved:', newDonor);
//     res.status(201).json(newDonor);
//   } catch (error) {
//     console.error('Error registering donor:', error);
//     if (error.response) {
//         console.error('Response data:', error.response.data);
//         console.error('Response status:', error.response.status);
//         console.error('Response headers:', error.response.headers);
//     } else if (error.request) {
//         console.error('Request data:', error.request);
//     } else {
//         console.error('Error message:', error.message);
//     }
//     console.error('Config:', error.config);
//     res.status(500).json({ message: 'Internal server error', error: error.message });
// }

// };


// // Controller to get all donors
// export const getAllDonors = async (req, res) => {
//   try {
//     const donors = await Donor.find();
//     res.json(donors);
//   } catch (error) {
//     console.error('Error registering donor:', error);
//     if (error.response) {
//         console.error('Response data:', error.response.data);
//         console.error('Response status:', error.response.status);
//         console.error('Response headers:', error.response.headers);
//     } else if (error.request) {
//         console.error('Request data:', error.request);
//     } else {
//         console.error('Error message:', error.message);
//     }
//     console.error('Config:', error.config);
//     res.status(500).json({ message: 'Internal server error', error: error.message });
// }

// };




import Donor from '../module/DonerSchema.js';
import validator from 'validator';

// Controller to add a new donor
export const addDonor = async (req, res) => {
  console.log('Received data:', req.body);

  const { name, bloodGroup, contactInfo, messages } = req.body;
  try {
      if (!name) {
          return res.status(400).json({ message: 'Name is required.' });
      }

      if (!bloodGroup) {
          return res.status(400).json({ message: 'Blood group is required.' });
      }

      if (!contactInfo) {
          return res.status(400).json({ message: 'Contact info is required.' });
      }

      if (!messages) {
          return res.status(400).json({ message: 'Messages are required.' });
      }

      // Ensure contactInfo is a string before validating
      if (typeof contactInfo !== 'string') {
          return res.status(400).json({ message: 'Contact info must be a string.' });
      }

      if (!validator.isMobilePhone(contactInfo, 'any')) {
          return res.status(400).json({ valid: false, message: 'Invalid phone number format.' });
      }

      const donor = new Donor({ name, bloodGroup, contactInfo, messages });
      const newDonor = await donor.save();
      res.status(201).json(newDonor);
  } catch (error) {
      console.error('Error registering donor:', error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};


// Controller to get all donors
export const getAllDonors = async (req, res) => {
  try {
    const donors = await Donor.find();
    res.json(donors);
  } catch (error) {
    console.error('Error fetching donors:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

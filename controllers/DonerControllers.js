// // controllers/donorController.js

// import Donor from "../module/DonerSchema.js";
// import validator from "validator";

// export const getAllDonors = async (req, res) => {
//     try {
//         const donors = await Donor.find();
//         res.json(donors);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

// export const addDonor = async (req, res) => {
//     const { name, bloodGroup, contactInfo, messagess, image } = req.body;

//     // Validate phone number format
//     if (!validator.isMobilePhone(contactInfo, 'any')) {
//         return res.status(400).json({ valid: false, message: 'Invalid phone number format.' });
//     }

//     // Create new donor
//     const donor = new Donor({ name, bloodGroup, contactInfo, messagess, image });

//     try {
//         const newDonor = await donor.save();
//         res.status(201).json(newDonor);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// }







// // controllers/donorController.js
// import path from 'path';
// import multer from 'multer';
// import fs from 'fs';
// import Donor from '../module/DonerSchema.js';
// import validator from 'validator';

// // Ensure the 'uploads' directory exists
// const ensureUploadsDirExists = () => {
//   const uploadsDir = path.resolve('uploads');
//   if (!fs.existsSync(uploadsDir)) {
//     fs.mkdirSync(uploadsDir, { recursive: true });
//   }
// };

// // Multer configuration
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     ensureUploadsDirExists(); // Ensure 'uploads' directory exists
//     cb(null, 'uploads/'); // Directory where uploaded files will be stored
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, uniqueSuffix + path.extname(file.originalname)); // Generate unique filename
//   }
// });

// export const upload = multer({ storage });  

// // Controller to add a new donor with image upload
// export const addDonor = async (req, res) => {
//   const { name, bloodGroup, contactInfo, messages } = req.body;

//   try {
//     // Validate phone number format
//     if (!validator.isMobilePhone(contactInfo, 'any')) {
//       return res.status(400).json({ valid: false, message: 'Invalid phone number format.' });
//     }

//     let image = '';
//     if (req.file) {
//       image = req.file.path; // Save the path to the uploaded image
//     } else {
//       return res.status(400).json({ message: 'Image is required.' });
//     }

//     // Create new donor instance
//     const donor = new Donor({ name, bloodGroup, contactInfo, messages, image });

//     // Save donor to database
//     const newDonor = await donor.save();
//     res.status(201).json(newDonor);
//   } catch (error) {
//     console.error('Error registering donor:', error);
//     res.status(500).json({ message: 'Internal server error.' });
//   }
// };

// // Controller to get all donors
// export const getAllDonors = async (req, res) => {
//   try {
//     const donors = await Donor.find();
//     res.json(donors);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


// import path from 'path';
// import multer from 'multer';
// import fs from 'fs';
// import Donor from '../module/DonerSchema.js';
// import validator from 'validator';

// // Ensure the 'uploads' directory exists
// const ensureUploadsDirExists = () => {
//   const uploadsDir = path.resolve('uploads');
//   if (!fs.existsSync(uploadsDir)) {
//     fs.mkdirSync(uploadsDir, { recursive: true });
//   }
// };

// // Multer configuration
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     ensureUploadsDirExists(); // Ensure 'uploads' directory exists
//     cb(null, 'uploads/'); // Directory where uploaded files will be stored
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, uniqueSuffix + path.extname(file.originalname)); // Generate unique filename
//   }
// });

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image/')) {
//     cb(null, true);
//   } else {
//     cb(new Error('Invalid file type. Only image files are allowed.'));
//   }
// };

// export const upload = multer({ storage, fileFilter });  

// // Controller to add a new donor with image upload
// export const addDonor = async (req, res) => {
//   const { name, bloodGroup, contactInfo, messages } = req.body;

//   try {
//     // Validate phone number format
//     if (!validator.isMobilePhone(contactInfo, 'any')) {
//       return res.status(400).json({ valid: false, message: 'Invalid phone number format.' });
//     }

//     let image = '';
//     if (req.file) {
//       image = req.file.path; // Save the path to the uploaded image
//     } else {
//       return res.status(400).json({ message: 'Image is required.' });
//     }

//     // Create new donor instance
//     const donor = new Donor({ name, bloodGroup, contactInfo, messages, image });

//     // Save donor to database
//     const newDonor = await donor.save();
//     res.status(201).json(newDonor);
//   } catch (error) {
//     console.error('Error registering donor:', error);
//     res.status(500).json({ message: 'Internal server error', error: error.message });
//   }
// };

// // Controller to get all donors
// export const getAllDonors = async (req, res) => {
//   try {
//     const donors = await Donor.find();
//     res.json(donors);
//   } catch (error) {
//     console.error('Error fetching donors:', error);
//     res.status(500).json({ message: 'Internal server error', error: error.message });
//   }
// };






import path from 'path';
import multer from 'multer';
import fs from 'fs';
import Donor from '../module/DonerSchema.js';
import validator from 'validator';

// Ensure the 'uploads' directory exists
const ensureUploadsDirExists = () => {
  const uploadsDir = path.resolve('uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
};

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    ensureUploadsDirExists(); // Ensure 'uploads' directory exists
    cb(null, 'uploads/'); // Directory where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Generate unique filename
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only image files are allowed.'));
  }
};

export const upload = multer({ storage, fileFilter });  

// Controller to add a new donor with image upload
export const addDonor = async (req, res) => {
  const { name, bloodGroup, contactInfo, messages } = req.body;

  try {
    // Validate phone number format
    if (!validator.isMobilePhone(contactInfo, 'any')) {
      return res.status(400).json({ valid: false, message: 'Invalid phone number format.' });
    }

    let image = '';
    if (req.file) {
      image = req.file.path; // Save the path to the uploaded image
    } else {
      return res.status(400).json({ message: 'Image is required.' });
    }

    // Create new donor instance
    const donor = new Donor({ name, bloodGroup, contactInfo, messages, image });

    // Save donor to database
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

import jwt from "jsonwebtoken";
import { UserModel } from "../module/UserSchema.js";
 const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')

    if(!token){
        return res.status(401).json({msg: "unautherized HTTP , hello Token not provided"})
    }
    console.log('token from auth middleware', token)

    try {
        const isVerified = jwt.verify(token, process.env.SecretKey) 
        const userData = await UserModel.findOne({email: isVerified.email}).select({
            password: 0
        });
        req.user = userData;
        req.token = token;
        req.userId = userData._id
        console.log('User data from auth middleware:', userData);

        next()
    } catch (error) {
        return res.status(401).json({msg: "unautherized HTTP , Token not provided"})
        
    }
    
}

export default authMiddleware





// import jwt from "jsonwebtoken";
// import { UserModel } from "../module/UserSchema.js";

// const authMiddleware = async (req, res, next) => {
//     const authorizationHeader = req.header('Authorization'); // Correct spelling

//     // Check if there is an authorization header
//     if (!authorizationHeader) {
//         return res.status(401).json({ msg: "Unauthorized HTTP, Token not provided" });
//     }

//     // Extract token from the authorization header
//     const token = authorizationHeader.split(' ')[1]; // Assuming 'Bearer <token>'

//     if (!token) {
//         return res.status(401).json({ msg: "Unauthorized HTTP, Token not provided" });
//     }

//     console.log('Token from auth middleware:', token);

//     try {
//         // Verify the token using the secret key from environment variables
//         const isVerified = jwt.verify(token, process.env.SecretKey);

//         // Find the user in the database by email
//         const userData = await UserModel.findOne({ email: isVerified.email })
//             .select('-password'); // Exclude password

//         // If no user is found, return unauthorized
//         if (!userData) {
//             return res.status(401).json({ msg: "Unauthorized HTTP, User not found" });
//         }

//         // Attach user data and token to request object
//         req.body = userData;
//         req.token = token;
//         req.userId = userData._id;

//         console.log('User data:', userData);
//         next(); // Proceed to the next middleware
//     } catch (error) {
//         console.error('Error in auth middleware:', error);
//         return res.status(401).json({ msg: "Unauthorized HTTP, Token not provided" });
//     }
// };

// export default authMiddleware;

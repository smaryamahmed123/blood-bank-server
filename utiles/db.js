
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
const uri = process.env.MongoDB_URL;
// console.log("MongoDB_URL:", uri); // Add this line for debugging
// const uri = "mongodb://127.0.0.1:27017/registration"
const mongoDB = async ()=>{
    try {
    await mongoose.connect(uri);
    
        mongoose.connection.on("connected", () => console.log("MongoDB Connected"));
        mongoose.connection.on("error", (err) => console.log("MongoDB Error", err));;
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
    }
}

export default mongoDB



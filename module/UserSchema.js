
import bcrypt from 'bcrypt'
import mongoose from "mongoose";
import jwt from 'jsonwebtoken'

const schema = new mongoose.Schema({
  firstName: {
    type: String,
    // required: true,
  },
  lastName: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    // required: true,
  },
  password: {
    type: String,
    // required: true,
  },
  isAdmin: {
    type: String,
    default: false
  },
});




schema.pre("save", async function(next){
  const user = this;
  if(!user.isModified("password")){
    next();
  }
  try {
    const saltRound = await bcrypt.genSalt(10);
    const hash_Password = await bcrypt.hash(user.password, saltRound)
    user.password= hash_Password;
  } catch (error) {
    next(error)
  }
})

schema.methods.ComparePassword = async function(password){
  return bcrypt.compare(password, this.password);
}

schema.methods.generateToken = async function() {
  try {
    return jwt.sign({
      userId: this._id.toString(),
      email: this.email,
      isAdmin: this.isAdmin,
    },
    process.env.SecretKey,
    {
      expiresIn: '60d'
    }
  )
} catch (error) {
   // Handle error
   console.error(error);
   throw new Error('Token generation failed');
}
}
export const UserModel = mongoose.model("user", schema);

import { UserModel } from "../module/UserSchema.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export const home = async (req, res) => {
    try {
        res.status(200).send("hello world")
    } catch (error) {
        console.log(error)
    }
}

export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body
        const userExesis = await UserModel.findOne({ email })
        if (userExesis) {
            return res.status(400).json({ mg: 'email alreadi exist' })
        }


        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user with hashed password

        const newUser = await UserModel.create({
            firstName,
            lastName,
            email,
            password: hashedPassword // Use the hashed password
        });

        // const obj = {
        //     email: emailExist.email,
        //     _id: emailExist._id,
        //     firstName: emailExist.firstName,
        //     lastName: emailExist.lastName,
        //   }
        //   const token = jwt.sign(obj, "JAWANPAK")
        //   res.json({
        //     message: "successfully login",
        //     data: emailExist,
        //     status: true,
        //     token

        //   });
       
        res.status(200).json({
            msg: 'registration seccussful',
            token: await newUser.generateToken(),
            userId: newUser._id.toString(),
            user: newUser
        });
        console.log(req.body)
    } catch (error) {
        res.json({
            message: error.message,
            status: false

        });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExists = await UserModel.findOne({ email });

        if (!userExists) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const passwordMatch = userExists.ComparePassword(password)
        if (passwordMatch) {
            return res.status(200).json({
                message: 'Login successful',
                token: await userExists.generateToken(),
                userId: userExists._id.toString(),
                user: userExists
            });
        } else {
            return res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const user = async (req, res) => {
    try {
        const userData = req.user
        res.status(200).json({msg: userData})
    } catch (error) {
        console.log("err from user router", error)
    }
}
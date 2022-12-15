import User from "../model/User.js";
import bcrypt from "bcryptjs"


export const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    }
    catch (err) {
        console.log(err);
    }
    if (!users) {
        return res.status(400).json({message:"no users found"})
    }
    return res.status(200).json({users})
};


export const signup = async (req , res, next) => {
    const {name, email , password}  = req.body;

    let exitstingUser;
    try {
        exitstingUser = await User.findOne({email});
    }
    catch (err) {
        return console.log(err);
    }
    if (exitstingUser) {
        return res.status(400).json({message:" users already exits!"})
    }
    const hashedPassowrd = bcrypt.hashSync(password);
    const user= new User({
        name,
        email,
        password: hashedPassowrd,
        blogs:[]
    })
    try {
       await user.save();
    }
    catch (err) {
        return console.log(err);
    }
    return res.status(200).json({user});
};


export const login = async (req , res, next) => {
    const {email ,password}  = req.body;
    let exitstingUser;
    try {
        exitstingUser = await User.findOne({email});
    }
    catch (err) {
        return console.log(err);
    }
    if (!exitstingUser) {
        return res.status(404).json({message:" couldnt find user by this id!"})
    }
    const inPasswordCorrect = bcrypt.compareSync(password,exitstingUser.password)
    if (!inPasswordCorrect) {
        return res.status(400).json({message:"incorrect password!"})
    }
    return res.status(400).json({message:"login succesfull!"})
};


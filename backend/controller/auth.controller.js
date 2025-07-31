import gentoken from "../config/token.js";
import User from "../model/user.model.js";
import bcrypt from "bcryptjs";

export const SignUp=async(req,res)=>{
    try {
        let {name,email,password}=req.body;
        let existuser=await User.findOne({email});
        if(existuser){
            return res.status(400).json({message:"user is already exist"});
        }
        let hashpassword=await bcrypt.hash(password,10);
        let user=await User.create({
            name,
            email,
            password:hashpassword
        })
        let token=await gentoken(user._id);

       res.cookie("token", token, {
            httpOnly: true,
            secure: false,        // localhost के लिए false
            sameSite: "lax",      // "none" की बजाय "lax" use करें
            path: "/",            // path add करें
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

     return res.status(201).json(user);
    } catch (error) {
        return res.status(500).json({message:"signup error is here"+error})
    }
}

export const login=async(req,res)=>{
      try {
        let {email,password}=req.body;
        let user=await User.findOne({email}).populate("listing","title image1 image2 image3 description rent category city landMark");
        if(!user){
            return res.status(400).json({message:"user is not exist"});
        }
        let IsMatch=await bcrypt.compare(password,user.password);
        if(!IsMatch){
            return res.status(400).json({message:"Incorrect Password"});
        }
        let token=await gentoken(user._id);

       res.cookie("token", token, {
            httpOnly: true,
            secure: false,        // localhost के लिए false
            sameSite: "lax",      // "none" की बजाय "lax" use करें
            path: "/",            // path add करें
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

     return res.status(201).json(user);
    } catch (error) {
        return res.status(500).json({message:"login error is here"+error})
    }
}

export const logout=async(req,res)=>{
    try {
        res.clearCookie("token");
        return res.status(200).json({message:"logout successfull"})
    } catch (error) {
        return res.status(500).json({message:`some erroe is come in login ${error}`})
    }
}
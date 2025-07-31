// import IsUser from "../middleware/user.middle";
import User from "../model/user.model.js";

export const getCurrentUser=async (req,res)=>{
   try {
     let user=await User.findById(req.userId).select("-password").populate("listing","title image1 image2 image3 description rent category city landMark isBooked rating host guest ").populate("booking","title image1 image2 image3 description rent category city landMark isBooked rating host guest")
    if(!user){
        res.status(400).json({message:"user do not exst"})
    }
   res.status(200).json({ message: "user is here", user });
   } catch (error) {
    res.status(400).json({message:"your is not exist"+error})
   }
}
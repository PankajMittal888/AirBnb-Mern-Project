import { log } from "console";
import CloudinaryStorage from "../config/cloudinary.js";
import Listing from "../model/listing.model.js";
import User from "../model/user.model.js";

export const AddListing=async(req,res)=>{
    try {
        let host=req.userId;
        let {title,description,rent,category,city,landMark}=req.body;
        let image1=await CloudinaryStorage(req.files.image1[0].path);
        let image2=await CloudinaryStorage(req.files.image2[0].path);
        let image3=await CloudinaryStorage(req.files.image3[0].path);

       let result=await Listing.create({
            title,description,rent,category,city,landMark,host,image1,image2,image3
        })

        let user=await User.findByIdAndUpdate(host,{$push:{listing:result._id}},{new:true});

        if(!user){
               res.status(404).json({message:"we are not getting uswr when create listing"})
        }
        
        res.status(201).json(result)
    } catch (error) {
        res.status(404).json({message:"something went wrong when we are create list",error})
    }
}

export const getListing=async (req,res)=>{
 try {
       let listing=await Listing.find().sort({createdAt:-1})
   return res.status(200).json(listing)

 } catch (error) {
  res.status(400).json({message:"erroe in get listing",error})  
 }
}


export const FindListing=async(req,res)=>{ 
    try {
        let {id}=req.params;
        console.log(id);
        
        let list=await Listing.findById(id)
        console.log(list);
        
        if(!list){
           return res.status(400).json("listing not found on finding list")
        }
       return res.status(200).json(list)
    } catch (error) {
       return  res.status(500).json("listing not found on finding list",error)
    }
}

export const Update=async (req,res)=>{
   try {
        let {id}=req.params;
        console.log(id);
        
        let {title,description,rent,category,city,landMark}=req.body;
        let image1;
        let image2;
        let image3;
        if(req.files.image1) {image1=await CloudinaryStorage(req.files.image1[0].path)};
         if(req.files.image2) {image2=await CloudinaryStorage(req.files.image2[0].path)};
        if(req.files.image3) {image3=await CloudinaryStorage(req.files.image3[0].path)};

       let result=await Listing.findByIdAndUpdate(id,{
            title,description,rent,category,city,landMark,image1,image2,image3
        },{new:true})
        
 
        res.status(201).json(result)
    } catch (error) {
        res.status(404).json({message:"something went wrong when we are create list",error})
    }
}

export const DeleteListing=async (req,res)=>{
  try {
  
    
      let {id}=req.params;
        console.log(id);
    let list=await Listing.findByIdAndDelete(id);
    console.log(list);
    
     if(!list){
        res.status(400).json("error come in delete")
    }
    
       let user=await User.findByIdAndUpdate(list.host,{
        $pull:{listing:list._id}
    },{new:true})
    console.log(user);
    
    if(!user){
        res.status(400).json("error come in delete user not find")
    }
     res.status(200).json({message:"list is deleted",list})
  } catch (error) {
res.status(500).json({ message: "error come in delete server error", error });

  }
}


export const RatingListing=async(req,res)=>{
    try {
        let {id}=req.params;
        let {rating}=req.body;
        let list=await Listing.findById(id);
          if(!list){
           return res.status(400).json("listing not found on finding list")
        }
        list.rating=Number(rating);
        await list.save();
        return res.status(200).json({message:"rating create"})
    } catch (error) {
       return res.status(200).json({message:"rating create error"})   
    }
}

export const Search=async(req,res)=>{
    try {
        const {query}=req.query;
        if(!query){
            res.status(400).json({message:"search query is required"})
        }
        const listing=await Listing.find({
            $or:[
               { landMark:{$regex:query,$options:"i"}},
                { city:{$regex:query,$options:"i"}},
                 { title:{$regex:query,$options:"i"}}
            ],
        })
        return res.status(200).json(listing);
    } catch (error) {
          res.status(500).json({message:"error come in search query ",error})
    }
}
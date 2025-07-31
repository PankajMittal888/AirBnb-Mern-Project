import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

const CloudinaryStorage=async (filepath)=>{
    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.CLOUD_API_KEY, 
        api_secret: process.env.CLOUD_SECRET_KEY
    });
    try {
        if(!filepath){
            return null
        }
        const UploadImage=await cloudinary.uploader
       .upload(filepath);
        fs.unlinkSync(filepath)
        return UploadImage.secure_url
    } catch (error) {
         fs.unlinkSync(filepath)
         console.log("error in cloudinay connecting"+error);
    }
}

export default CloudinaryStorage;
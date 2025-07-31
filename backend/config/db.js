import mongoose from "mongoose";

const connectdb=async()=>{
    try {    
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("database connected");
    } catch (error) {
        console.log("something went wrong on database connection"+error);
        
    }
}
export default connectdb;
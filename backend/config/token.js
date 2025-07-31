import jwt from "jsonwebtoken";

const gentoken=async(userId)=>{
    try {
        let token=await jwt.sign({userId},process.env.JWT_SECRET,{
            expiresIn:"7d"
        });
        return token
    } catch (error) {
     console.log("token error is here to build error");
    }
}
export default gentoken;


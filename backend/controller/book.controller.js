import Booking from "../model/booking.model.js";
import Listing from "../model/listing.model.js";
import User from "../model/user.model.js";

export const CreateBooking=async (req,res)=>{
    try {
        let {id}=req.params;
        // console.log(id);
        
        let {checkIn,checkOut,totalRent}=req.body;
        // console.log(req.body);
        
            let listing=await Listing.findById(id);
            // console.log(listing);
            
            if(!listing){
             return   res.status(400).json("listing is not find when booking")
            }

            if(new Date(checkIn)>= new Date(checkOut)){
              return  res.status(400).json("invalid checkin or checkout date")
            }
            if(listing.isBooked){
             return   res.status(400).json("it is already Booked")
            }
                // console.log(req.userId);
                // console.log(checkIn,checkOut,listing.host,listing._id,totalRent);
                
            let booking= await Booking.create({
                checkIn,checkOut,totalRent,
                host:listing.host,
                guest:req.userId,
                list:listing._id
            })
                // await booking.populate("email","host")
            // console.log(booking);
            
            let user=await User.findByIdAndUpdate(req.userId,{
                $push:{booking:listing}
            })
console.log(user);

            if(!user){
                return res.status(400).json("user not find on adding booking")
            }

            listing.guest=req.userId;
            listing.isBooked=true;
            await listing.save();
            return res.status(200).json({message:"booking created",booking})
    } catch (error) {
        return res.status(500).json({message:"error in booking created",error})
    }
}

export const CancelBooking=async(req,res)=>{

    try {
        let {id}=req.params;
        console.log(id);
        
    let list=await Listing.findByIdAndUpdate(id,{isBooked:false})
    console.log(list);
    
    let user=await User.findByIdAndUpdate(list.guest,{
        $pull:{booking:list._id}
    },{new:true})
    if(!user){
        res.status(400).json({message:"user not found at time of cancel"})
    }
    res.status(200).json({message:"booking is cancel"})
    console.log("hanasjbduibeidedjnkeuifhuwenkfjweuihfui");
    
        
    } catch (error) {
         res.status(500).json({message:"user not found at time of cancel",error})
    }
}
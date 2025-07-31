import express from "express";
import dotenv from "dotenv";
import connectdb from "./config/db.js";
import authrouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import listingRouter from "./routes/listing.route.js";
import BookRouter from "./routes/book.route.js";
dotenv.config();
let app=express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use('/api/auth',authrouter);
app.use("/api/user",userRouter)
app.use("/api/listing",listingRouter);
app.use("/api/book",BookRouter)

app.listen(process.env.PORT || 6000,()=>{
    connectdb();
    console.log(`app is listen on ${process.env.PORT}`);
})

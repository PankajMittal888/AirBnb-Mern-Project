import express from "express";
import IsUser from "../middleware/user.middle.js";
import upload from "../middleware/multer.js";
import { AddListing, DeleteListing, FindListing, getListing, RatingListing, Search, Update } from "../controller/listing.controller.js";
let listingRouter=express.Router();

listingRouter.post("/add",IsUser,upload.fields([
    {name:"image1",maxCount:1},
    {name:"image2",maxCount:1},
    {name:"image3",maxCount:1}
]),AddListing)

listingRouter.post("/update/:id",IsUser,upload.fields([
    {name:"image1",maxCount:1},
    {name:"image2",maxCount:1},
    {name:"image3",maxCount:1}
]),Update)

listingRouter.get('/get',getListing);
listingRouter.get('/find/:id',IsUser,FindListing);
listingRouter.delete('/delete/:id',IsUser,DeleteListing);
listingRouter.post('/rating/:id',IsUser,RatingListing);
listingRouter.get('/search',Search);
export default listingRouter;
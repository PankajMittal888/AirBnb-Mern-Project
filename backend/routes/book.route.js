import express from "express";
import IsUser from "../middleware/user.middle.js";
import { CancelBooking, CreateBooking } from "../controller/book.controller.js";

const BookRouter=express.Router();
BookRouter.post('/create/:id',IsUser,CreateBooking);
BookRouter.delete('/cancel/:id',IsUser,CancelBooking);

export default BookRouter;
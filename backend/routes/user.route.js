import express from "express";
import IsUser from "../middleware/user.middle.js";
import { getCurrentUser } from "../controller/user.controller.js";
const userRouter=express.Router();

userRouter.get("/currentUser",IsUser,getCurrentUser);

export default userRouter;
import express from "express";
import { login, logout, SignUp } from "../controller/auth.controller.js";
const authrouter=express.Router();

authrouter.post('/signup',SignUp);
authrouter.post('/login',login);
authrouter.post('/logout',logout); 


export default authrouter;
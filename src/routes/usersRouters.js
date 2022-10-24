import { createUser } from "../controllers/userController.js";
import { Router } from "express";

let userRouter = Router();
userRouter.post('/user', createUser);


export default userRouter;
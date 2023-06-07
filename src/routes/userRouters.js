import { createUser, loginUser, getDriver, updateUser} from "../controllers/userController.js";
import { Router } from "express";

let userRouter = Router();
userRouter.post('/user', createUser);
userRouter.post('/user/login', loginUser);
userRouter.post('/user/update', updateUser);
userRouter.post('/select/driver', getDriver)


export default userRouter;
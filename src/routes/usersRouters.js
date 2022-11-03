import { createCustomer, loginCustomer} from "../controllers/userController.js";
import { Router } from "express";

let userRouter = Router();
userRouter.post('/customer', createCustomer);
userRouter.post('/customer/login', loginCustomer);


export default userRouter;
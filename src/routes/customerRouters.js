import { createCustomer, loginCustomer} from "../controllers/customerController.js";
import { Router } from "express";

let customerRouter = Router();
customerRouter.post('/customer', createCustomer);
customerRouter.post('/customer/login', loginCustomer);


export default customerRouter;
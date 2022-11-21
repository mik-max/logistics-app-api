import { createCustomer, loginCustomer, getDriver} from "../controllers/customerController.js";
import { Router } from "express";

let customerRouter = Router();
customerRouter.post('/customer', createCustomer);
customerRouter.post('/customer/login', loginCustomer);
customerRouter.post('/select/driver', getDriver)


export default customerRouter;
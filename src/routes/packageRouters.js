import { Router } from "express";
import { sendPackage, allPaymentMethod } from "../controllers/packageController.js";

let packageRouter = Router();

packageRouter.post('/package', sendPackage)
packageRouter.get('/paymentMethod', allPaymentMethod)

export default packageRouter;
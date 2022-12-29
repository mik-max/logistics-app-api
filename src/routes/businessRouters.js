import { createBusiness, loginBusiness} from "../controllers/businessController.js";
import { Router } from "express";

let businessRouter = Router();
businessRouter.post('/business', createBusiness);
businessRouter.post('/business/login', loginBusiness);


export default businessRouter;
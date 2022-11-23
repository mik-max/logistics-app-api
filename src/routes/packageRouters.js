import { Router } from "express";
import { sendPackage } from "../controllers/packageController.js";

let packageRouter = Router();

packageRouter.post('/package',sendPackage)

export default packageRouter;
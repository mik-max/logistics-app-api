import { createDriver, updateDriver } from "../controllers/driverController.js";
import { Router } from "express";

let driverRouter = Router();

driverRouter.post('/driver', createDriver)
driverRouter.put('/driver/:id', updateDriver)


export default driverRouter;
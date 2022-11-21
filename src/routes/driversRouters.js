import { createDriver,loginDriver, updateDriver} from "../controllers/driverController.js";
import { Router } from "express";

let driverRouter = Router();

driverRouter.post('/driver', createDriver)
driverRouter.post('/driver/login', loginDriver)
driverRouter.put('/driver/:id', updateDriver)



export default driverRouter;
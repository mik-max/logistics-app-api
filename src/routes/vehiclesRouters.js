import {
  createVehicle,
  updateVehicle,
  approveVehicle,
  rejectVehicle,
} from "../controllers/vehicleController.js";
import { Router } from "express";

let vehicleRouter = Router()

vehicleRouter.post('/vehicles',createVehicle);
vehicleRouter.put('/vehicles/:id',updateVehicle);
vehicleRouter.put("/approve/:id", approveVehicle);
vehicleRouter.put("/reject/:id", rejectVehicle);

export default vehicleRouter;
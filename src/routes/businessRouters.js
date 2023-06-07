import { uploadBusinessInformation,  uploadBusinessDocuments, verifyBusinessDocuments, declineBusinessDocuments, getBusinessDocuments, getBusinessDocumentsById, getBusinessInfo} from "../controllers/businessController.js";
import { Router } from "express";

let businessRouter = Router();
businessRouter.get('/business/information/:id', getBusinessInfo);
businessRouter.post('/business/information/upload', uploadBusinessInformation);
businessRouter.post('/business/documents/upload', uploadBusinessDocuments);
businessRouter.put('/business/documents/verify/:id', verifyBusinessDocuments);
businessRouter.put('/business/documents/decline/:id', declineBusinessDocuments);
businessRouter.get('/business/documents', getBusinessDocuments);
businessRouter.get('/business/documents/:id', getBusinessDocumentsById);


export default businessRouter;
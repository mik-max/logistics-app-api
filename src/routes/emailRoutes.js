import { reSendOtps, verifyOtps, expireOtps, mailDriver, repuestProcessing, repuestProcessed} from "../controllers/emailController.js";
import { Router } from 'express';

let emailRouter = Router();
emailRouter.post('/otps/resend', reSendOtps);
emailRouter.post('/otps/verify', verifyOtps)
emailRouter.get('/otps/expire', expireOtps)
emailRouter.post('/mail/driver', mailDriver)
emailRouter.post('/request/processing', repuestProcessing)
emailRouter.post('/request/processed', repuestProcessed)

export default emailRouter;
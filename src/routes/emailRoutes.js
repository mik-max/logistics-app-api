import { reSendOtps, verifyOtps, expireOtps } from "../controllers/emailController.js";
import { Router } from 'express';

let emailRouter = Router();
emailRouter.post('/otps/resend', reSendOtps);
emailRouter.post('/otps/verify', verifyOtps)
emailRouter.get('/otps/expire', expireOtps)

export default emailRouter;
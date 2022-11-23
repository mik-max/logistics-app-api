import { chargeCard, cardPaymentAuth, validatePayment, paymentFailed, paymentPending, paymentSuccessfull, bankCharge, ussdCharge } from "../controllers/paymentController.js";

import { Router } from "express";

let paymentRouter = Router();
paymentRouter.post('/pay/card', chargeCard);
paymentRouter.post('/pay/card/auth', cardPaymentAuth);
paymentRouter.post('/pay/validate', validatePayment);

paymentRouter.post('/pay/bank', bankCharge)
paymentRouter.post('/pay/ussd', ussdCharge)
paymentRouter.get('/pay/successful', paymentSuccessfull);
paymentRouter.get('/pay/processing', paymentPending);
paymentRouter.get('/pay/failed', paymentFailed);


export default paymentRouter;
import { flutterWaveCardCharge, flutterWaveVerifyTransaction, flutterWaveValidateCharge, flutterWaveBankCharge, flutterWaveUssdCharge } from "../Services/PaymentServices.js";
import { createDebitTransactionData , authorizeDebitTransactionData, validateDebitTransactionData, createChargeData, createEscrowTransactionData} from "../data/transactions/index.js";
import { calculateFee } from "../utilities/feeCalculator.js";
import { makeReference } from "../utilities/generateReference.js";
import Jwt from "jsonwebtoken";
import configData from "../../config.js";
export const chargeCard = async (req, res) => {
     const payload = {
          card_number:req.body.cardNumber,
          cvv:req.body.cvv,
          expiry_month:req.body.expiryMonth,
          expiry_year:req.body.expiryYear,
          currency: req.body.currency,
          amount: req.body.totalAmount,
          email: req.body.email,
          fullname: req.body.fullName,
          // Generate a unique transaction reference
          tx_ref: makeReference(12),
          redirect_url: process.env.APP_BASE_URL + '/pay/redirect',
          enckey: configData.flwEncryptionKey,
          subaccounts:[
               {
                  id:"RS_F734DC32F548C9A865A0D9345984C90F"
               }
          ]
     }
    try { 
          const response = await flutterWaveCardCharge(payload)
          let charge = calculateFee(req.body.totalAmount, req.body.subtotalAmount) //calculate charge
          let data = await createDebitTransactionData(req.body, payload.tx_ref, charge)// write into database
          await createChargeData(req.body.chargeTypeId, charge, data[0].Id)
          let session = Jwt.sign({
               chargePayload: payload,
               authFields:response.meta.authorization.fields,
               authModes: response.meta.authorization.mode,
               Id: data[0].Id,
               DateCreated: data[0].DateCreated
          }, configData.expressSessionSecrete, {expiresIn: "30m"})
          if(response?.meta?.authorization?.mode == 'pin'){
               res.status(201).send({status: 'Pin', data: {session: session}, message: "Kindly input your card pin."}); 
          }else if(response?.meta?.authorization?.mode == 'avs_noauth'){
               res.status(201).send({status: 'Location', data: {session: session}, message: "Kindly input your location address"}); 
          }
          else if(response?.meta?.authorization?.mode == 'redirect'){
                    // Store the transaction ID
                   // so we can look it up later with the flw_ref
                   await redis.setAsync(`txref-${response.data.tx_ref}`, response.data.id);
                   const authUrl = response.meta.authorization.redirect;
                   return res.redirect(authUrl);
          }else{
                    // No authorization needed; just verify the payment
                   const transactionId = response.data.id;
                   const transactionStatus = await flutterWaveVerifyTransaction(transactionId);
                   if (transactionStatus == "successful") {
                         await authorizeDebitTransactionData(session.Id, response.data.flw_ref); // write to database
                         await validateDebitTransactionData(session.Id)// write to database
                        await createEscrowTransactionData(session.Id, session.DateCreated)
                       return res.redirect(`${configData.devUrl}/api/v1/pay/successful`);
                   } else if (transactionStatus == "pending") {
                       // Schedule a job that polls for the status of the payment every 10 minutes
                       transactionVerificationQueue.add({id: transactionId});
                       return res.redirect(`${configData.devUrl}/api/v1/pay/processing`);
                   } else {
                       return res.redirect(`${configData.devUrl}/api/v1/pay/failed`);
                   }
          }
    } catch (error) {
          res.status(500).send({status: 'Failed', data: null, message: error.message}); 
    }
}

export const cardPaymentAuth = async ( req, res) => {
     
     try {
          let session = Jwt.verify(req.body.session, configData.expressSessionSecrete)
          
          const payload = session.chargePayload;
          // Add the auth mode and requested fields to the payload,
          // then call chargeCard again
          payload.authorization = {
               mode: session.authModes,
          };
          session.authFields.forEach(field => {
               payload.authorization[field] = req.body[field];
          });
          const response = await flutterWaveCardCharge(payload);  
          let ref = Jwt.sign({
               flw_ref: response.data.flw_ref,
               Id: session.Id,
               DateCreated: session.DateCreated
          }, configData.expressSessionSecrete)   
          if(response?.meta?.authorization?.mode == 'otp'){
               await authorizeDebitTransactionData(session.Id, response.data.flw_ref); // write to database
               res.status(200).send({status: "Otp", data: {ref: ref}, message:"Kindly input the otp sent to your mobile phone."})
          }else if(response?.meta?.authorization?.mode == 'redirect'){
               await authorizeDebitTransactionData(session.Id, response.data.flw_ref); // write to database
               const authUrl = response.meta.authorization.redirect;
               return res.redirect(authUrl);
          }else{
               const transactionId = response.data.id;
               const transactionStatus = await flutterWaveVerifyTransaction(transactionId);
               if (transactionStatus == "successful") {
                    await authorizeDebitTransactionData(session.Id, response.data.flw_ref); // write to database
                    await validateDebitTransactionData(session.Id)// write to database
                    await createEscrowTransactionData(session.Id, session.DateCreated)// write to database
                    return res.redirect(`${configData.devUrl}/api/v1/pay/successful`);
               } else if (transactionStatus == "pending") {
               // Schedule a job that polls for the status of the payment every 10 minutes
               //     transactionVerificationQueue.add({id: transactionId});
                    return res.redirect(`${configData.devUrl}/api/v1/pay/processing`);
               } else {
                    return res.redirect(`${configData.devUrl}/api/v1/pay/failed`);
               }
          }
     } catch (error) {
          res.status(500).send({status:"Failed", data:null, message: error.message})
     }
     
}

export const validatePayment = async(req, res) => {
     try {
          let ref = Jwt.verify(req.body.ref, configData.expressSessionSecrete)
          const response = await flutterWaveValidateCharge(req.body.otp, ref.flw_ref)

          if (response.data.status === 'successful' || response.data.status === 'pending') {
               // Verify the payment
               
               const transactionId = response.data.id;
               const transactionStatus = await flutterWaveVerifyTransaction(transactionId);
               if (transactionStatus == "successful") {
                    await validateDebitTransactionData(ref.Id);
                    let result = await createEscrowTransactionData(ref.Id, ref.DateCreated);
                    console.log(result)
                    res.redirect(`${configData.devUrl}/api/v1/pay/successful`);
               } else if (transactionStatus == "pending") {
               // Schedule a job that polls for the status of the payment every 10 minutes
               //     transactionVerificationQueue.add({id: transactionId});
                    return res.redirect(`${configData.devUrl}/api/v1/pay/processing`);
               }
          }else{
               return res.redirect(`${configData.devUrl}/api/v1/pay/failed`);
          }
     } catch (error) {
          res.status(500).send({status:"Failed", data:null, message: error.message})
     }
     
}

export const bankCharge = async (req, res) => {
     const payload = {
          account_bank: req.body.accountBank,
          account_number: req.body.accountNumber,
          amount: req.body.amount,
          currency: req.body.currency,
          email: req.body.email,
          fullname: req.body.fullName,
          tx_ref: makeReference(12),
     }
     try {
          const response = await flutterWaveBankCharge(payload);
          if(response?.meta?.authorization?.mode == 'otp'){
               let ref = Jwt.sign({
                    flw_ref: response.data.flw_ref,
               }, configData.expressSessionSecrete)
               res.status(200).send({status: "Otp", data: {ref: ref}, message:"Kindly input the otp sent to your mobile phone."})
          }else if(response?.meta?.authorization?.mode == 'redirect'){
               const authUrl = response.meta.authorization.redirect;
               return res.redirect(authUrl);
          }
          else{
               res.status(201).send({status: 'Ok', data: response, message: 'Charge initiated'})
          }
     } catch (error) {
          res.status(500).send({status: 'Failed', data: null, message: error.message}); 
     }
}
export const ussdCharge = async (req, res) => {
     const payload = {
          account_bank: '044',
          amount: 5132.64,
          currency: 'NGN',
          email: 'chunkylover53@aol.com',
          tx_ref: makeReference(12),
          fullname: 'Homer Simpson',
          subaccounts:[
               {
                  id:"RS_F734DC32F548C9A865A0D9345984C90F"
               }
            ]
          // account_bank: req.body.accountBank,
          // account_number: req.body.accountNumber,
          // amount: req.body.amount,
          // currency: req.body.currency,
          // email: req.body.email,
          // fullname: req.body.fullName,
          // tx_ref: makeReference(12),
     }
     try {
          const response = await flutterWaveUssdCharge(payload);
          
          res.status(201).send({status: 'Ok', data: response, message: 'Charge initiated'})
     } catch (error) {
          res.status(500).send({status: 'Failed', data: null, message: error.message}); 
     }
}



export const paymentSuccessfull = (req, res) => {
     try {
          res.status(200).send({status: 'successful', data: null, message: "Payment has been successfully made "})
     } catch (error) {
          res.status(500).send({status:"Failed", data:null, message: error.message})
     }
}
export const paymentFailed = (req, res) => {
     try {
          res.status(200).send({status: 'Failed', data: null, message: "Payment has Failed. Please try again later"})
     } catch (error) {
          res.status(500).send({status:"Failed", data:null, message: error.message})
     }
}
export const paymentPending = (req, res) => {
     try {
          res.status(200).send({status: 'Pending', data: null, message: "Payment is processing kindly wait "})
     } catch (error) {
          res.status(500).send({status:"Failed", data:null, message: error.message})
     }
} 
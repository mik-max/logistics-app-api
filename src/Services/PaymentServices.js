import { response } from 'express';
import Flutterwave from 'flutterwave-node-v3';
import configData from '../../config.js';
const flw = new Flutterwave(configData.flwPublicKey, configData.flwSecretKey)

export const flutterWaveCardCharge = async (payload) => {
     const response  = await flw.Charge.card(payload)
     return response 
}
export const flutterWaveVerifyTransaction = async (transactionId) => {
     const transaction = await flw.Transaction.verify({id: transactionId});
     return transaction.data.status;
}
export const flutterWaveValidateCharge = async (otp, ref) => {
     const response = await flw.Charge.validate({
          otp: otp,
          flw_ref: ref
     });
     return response;
}

export const flutterWaveBankCharge= async (payload) => {
     const response = await flw.Charge.ng(payload);
     return response;
}
export const flutterWaveUssdCharge= async (payload) => {
     const response = await flw.Charge.ussd(payload);
     return response;
}


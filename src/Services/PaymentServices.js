import { json } from 'express';
import fetch from 'node-fetch';
import PayStack from 'paystack-node';
import configData from '../../config.js';

let APIKEY = configData.paystackApiKey
let environment = configData.nodeEnv

// const paystack = new PayStack(APIKEY, environment)
// const feesCalculator = new PayStack.Fees();
const MySecretKey = APIKEY;
export const initializePayment = async (form) => {
    let res = await fetch('https://api.paystack.co/transaction/initialize',{
          method: 'post',
          headers : {
               authorization: MySecretKey,
               'content-type': 'application/json',
               'cache-control': 'no-cache'    
           },
          body: JSON.stringify(form)
     })

     let data = await res.json();
     return data
}

export const verifyPayment = (ref, mycallback) => {
    const options = {
        url : 'https://api.paystack.co/transaction/verify/'+encodeURIComponent(ref),
        headers : {
            authorization: MySecretKey,
            'content-type': 'application/json',
            'cache-control': 'no-cache'    
        }
    }
    const callback = (error, response, body) => {
        return mycallback(error, body)
    }
    request(options, callback)
}


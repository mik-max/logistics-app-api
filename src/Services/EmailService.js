import Sib from 'sib-api-v3-sdk/src/index.js'
import configData from '../../config.js'
import { generateOtp } from './OtpGenerator.js'


export const sendOtp = (email) => {
     let otp = generateOtp();
     const client = Sib.ApiClient.instance
     const apiKey = client.authentications['api-key']
     apiKey.apiKey = configData.sendInBlueApiKey
     const transactionalEmailApi  = new Sib.TransactionalEmailsApi()

     const sender = {
          name: 'Logistics App',
          email: 'michaelchinye2018@gmail.com'
     }

     const receivers = [
          {email: `${email}`}
     ]

     transactionalEmailApi.sendTransacEmail({
          sender,
          to:receivers,
          subject: 'Custom email',
          htmlContent: `<!DOCTYPE html>
                         <html>
                              <head></head>
                              <body>
                                   <h1>Your One Time Pin</h1>
                                   <p>Kindly use the otp below to verify your account and continue to login</p>
                                   <b>OTP: <em>${otp}</em></b>
                                   <p>Kindly note that this otp is only valid for a period of 45 minutes</p>
                              </body>
                         </html>`
     }).then( response => { console.log(response)})
     return otp;
}


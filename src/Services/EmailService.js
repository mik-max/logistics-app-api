import Sib from 'sib-api-v3-sdk/src/index.js'
import configData from '../../config.js'
import { generateOtp } from './OtpGenerator.js'
import { createNewOtpData } from '../data/email/index.js'
import { encrypt } from '../utilities/hashing.js'
import { validateEmail } from '../utilities/emailValidation.js'
import { makeReference } from '../utilities/generateReference.js'

export const sendOtp = async (email) => {
     let validatedEmail = validateEmail(email)
     if(!validatedEmail){
          return false
     }
     let otp = generateOtp();
     let hashedOtp = encrypt(otp)
     let reference = makeReference(10)
     await createNewOtpData(hashedOtp, email, reference)
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
     return reference;
}

export const sendVehicleRejected = async (email) => {
     let validatedEmail = validateEmail(email)
     if(!validatedEmail){
          return false
     }
     // let otp = generateOtp();
     // let hashedOtp = encrypt(otp)
     // let reference = makeReference(10)
     // await createNewOtpData(hashedOtp, email, reference)
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
          subject: 'Vehicle Status',
          htmlContent: `<!DOCTYPE html>
                         <html>
                              <head></head>
                              <body>
                                   <h1>Your Vehicle Status</h1>
                                   <p>Dear Driver</p>
                                   <p>This is to inform you that the details of the vehicle uploded to the platform has been checked by the system Admin and Your vehicle has been <b>Rejected.</b> due to inappropriate vehicle document</p>
                                   <p>Kindly Reupload your vehicle document.</p>
                                   <br>
                                   <p>Regards,</p>
                                   <p>LA Team.</p>
                              </body>
                         </html>`
     }).then( response => { console.log(response)})
}
export const sendVehicleApproved = async (email) => {
     let validatedEmail = validateEmail(email)
     if(!validatedEmail){
          return false
     }
     // let otp = generateOtp();
     // let hashedOtp = encrypt(otp)
     // let reference = makeReference(10)
     // await createNewOtpData(hashedOtp, email, reference)
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
          subject: 'Vehicle Status',
          htmlContent: `<!DOCTYPE html>
                         <html>
                              <head></head>
                              <body>
                                   <h1>Your Vehicle Status</h1>
                                   <p>Dear Driver</p>
                                   <p>This is to inform you that the details of the vehicle uploded to the platform has been checked by the system Admin and Your vehicle has been <b>Approved.</b> </p>
                                   <p>You can now login to your dashboard to see available bids.</p>
                                   <br>
                                   <p>Regards,</p>
                                   <p>LA Team.</p>
                              </body>
                         </html>`
     }).then( response => { console.log(response)})
}
export const sendDriverPairing = async (email, name) => {
     let validatedEmail = validateEmail(email)
     if(!validatedEmail){
          return false
     }
     // let otp = generateOtp();
     // let hashedOtp = encrypt(otp)
     // let reference = makeReference(10)
     // await createNewOtpData(hashedOtp, email, reference)
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
          subject: 'Available Customer',
          htmlContent: `<!DOCTYPE html>
                         <html>
                              <head></head>
                              <body>
                                   <h1>Available Customer</h1>
                                   <p>Hello ${name} </p>
                                   <p>You Have been selected by a customer to move certain packages to their selected location  </p>
                                   <p>Logisticsapp would collect <em>20%</em> charge on the success of this transaction.</p>
                                   <p>Have a beautiful trip.</p>
                                   <br>
                                   <p>Regards,</p>
                                   <p>LA Team.</p>
                              </body>
                         </html>`
     }).then( response => { console.log(response)})
}
export const sendRepuestProcessing = async (email) => {
     let validatedEmail = validateEmail(email)
     if(!validatedEmail){
          return false
     }
     
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
          subject: 'Request in progress',
          htmlContent: `<!DOCTYPE html>
                         <html>
                              <head></head>
                              <body>
                                   <h1>Request processing</h1>
                                   <p> Your request is processing. You will receive an email notification once processing is completed </p>
                                   <p>kindly wait as we pair you with a driver.</p>
                                   <br>
                                   <p>Regards,</p>
                                   <p>LA Team.</p>
                              </body>
                         </html>`
     }).then( response => { console.log(response)})
}
export const sendRepuestProcessed = async (email) => {
     let validatedEmail = validateEmail(email)
     if(!validatedEmail){
          return false
     }
     
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
          subject: 'Request in progress',
          htmlContent: `<!DOCTYPE html>
                         <html>
                              <head></head>
                              <body>
                                   <h1>Request Processed</h1>
                                   <p> Your request has been processed. We have found a driver for you. </p>
                                   <p>kindly follow the link to the onsite chatbox of the truck owner where you both can further discuss.</p>
                                   <br>
                                   <p>Regards,</p>
                                   <p>LA Team.</p>
                              </body>
                         </html>`
     }).then( response => { console.log(response)})
}
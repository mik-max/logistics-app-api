import { sendOtp } from "../Services/EmailService.js";
import { createNewOtpData, getOtpData, verifyOtpData, expireOtpData, getAllOtpData  } from "../data/email/index.js";
import { encrypt } from "../utilities/hashing.js";
import { checkExpiryDate } from "../utilities/checkExpirydate.js";
import { validateEmail } from "../utilities/emailValidation.js";
export const reSendOtps = async (req, res, next) => {
     try {
          let validatedEmail = validateEmail(req.body.email)
          if(validatedEmail){
               let otpResponse = await sendOtp(req.body.email);
               res.status(200).send({status: "Ok", data: {reference: otpResponse}, message: `OTP has been successfully sent to ${req.body.email}` })
          }else{
               res.status(400).send({status: "Failed", data: null, message: `${req.body.email} is an invalid email ooooo abeg` })
          }
          
     } catch (error) {
          res.status(500).send({status: "Failed", data: null, message: error.message})
     }
}

export const verifyOtps = async (req, res, next) => {
     try {
          let hashedOtp = encrypt(req.body.otp)
          let data = await getOtpData(hashedOtp)
          if (data == undefined){
               res.status(200).send({status: "Failed", data: null, message: "Otp is invalid"})
          }
          let expirydate = new Date (data.ExpiresAt)
          let epoch= expirydate.getTime()/1000.0
          let result = checkExpiryDate(epoch)
          if(!result){
               await verifyOtpData(hashedOtp)
               res.status(200).send({status: "Ok", data: null, message: "Otp has been verified"})
          }else{
               res.status(200).send({status: "Expired", data: null, message: "Otp has expired"})
          }
     } catch (error) {
          res.status(500).send({status: "Failed", data: null, message: error.message})
     }
}
export const expireOtps = async (req, res, next) => {
     try {
          let data = await getAllOtpData();
          if (data != []){
               data.map(async(otp) => {
                    let result = checkExpiryDate(otp.ExpiresAt);
                    if(result){
                         await expireOtpData(otp.Otp)
                    }else{
                         // do nothing
                    }
               })
               res.send({status: "Completed", data: null, message: "Check completed"});
          }else{
               res.send({status: "Empty", data: null, message: "No record found"})
          }
          
     } catch (error) {
          res.status(500).send({status: "Failed", data: null, message: error.message})
     }
}
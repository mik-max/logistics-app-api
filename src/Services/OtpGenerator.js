import OtpGenerator from 'otp-generator';


export function generateOtp (){
   let otp =  OtpGenerator.generate(4,{ upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false  })
   return otp;
}
import 'dotenv/config'
const {
     PORT,
     HOST,
     HOST_URL,
     SQL_DATABASE,
     SQL_SERVER,
     SQL_PASSWORD ,
     SQL_USER,
     NODE_ENV,
     PAYSTACK_API_KEY,
     SENDINBLUE_API_KEY,
     OTP_SALT
} = process.env;

let configData = {
     host: HOST,
     url: HOST_URL,
     port: parseInt(PORT, 10),
     nodeEnv: NODE_ENV,
     paystackApiKey: PAYSTACK_API_KEY,
     sendInBlueApiKey: SENDINBLUE_API_KEY,
     otpSalt: OTP_SALT,
     sql:{
          server: SQL_SERVER,
          database: SQL_DATABASE,
          user: SQL_USER,
          password: SQL_PASSWORD,
          trustServerCertificate: true,
          options:{
               encrypt: true,
               enableArithAbort: true,
          }
     },
}
export default configData;

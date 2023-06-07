import 'dotenv/config'
const {
     PORT,
     HOST,
     HOST_URL,
     DEV_BASE_URL,
     SQL_DATABASE,
     SQL_SERVER,
     SQL_PASSWORD ,
     SQL_USER,
     NODE_ENV,
     PAYSTACK_API_KEY,
     SENDINBLUE_API_KEY,
     OTP_SALT,
     FLUTTERWAVE_PUBLIC_KEY,
     FLUTTERWAVE_SECRETE_KEY,
     FLUTTERWAVE_ENCRYPTION_KEY,
     MONGODB_CONNECTIONURL,
     EXPRESS_SESSION_SECRETE
} = process.env;

let configData = {
     host: HOST,
     url: HOST_URL,
     devUrl: DEV_BASE_URL,
     port: parseInt(PORT, 10),
     nodeEnv: NODE_ENV,
     paystackApiKey: PAYSTACK_API_KEY,
     flwPublicKey: FLUTTERWAVE_PUBLIC_KEY,
     flwSecretKey:FLUTTERWAVE_SECRETE_KEY,
     flwEncryptionKey:FLUTTERWAVE_ENCRYPTION_KEY,
     sendInBlueApiKey: SENDINBLUE_API_KEY,
     // mongoDbConnectionUrl: MONGODB_CONNECTIONURL,
     expressSessionSecrete: EXPRESS_SESSION_SECRETE,
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

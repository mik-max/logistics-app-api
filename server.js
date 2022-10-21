import express from 'express';
import Cors from 'cors';
import { initializePayment } from './src/Services/PaymentServices.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' assert {type: "json"};
import configData from './config.js';
import PayStack from 'paystack-node';


// Routes
import emailRouter from './src/routes/emailRoutes.js';


let APIKEY = configData.paystackApiKey
let environment = configData.nodeEnv

const paystack = new PayStack(APIKEY, environment)
const feesCalculator = new PayStack.Fees();


const app = express()
const port = process.env.PORT || 8005
//middlewares
app.use(express.json());
app.use(Cors());

//Endpoints
app.get('/', (req, res) => res.status(200).send('Hello CleverProgrammers!!!!!. CELZ4 API!!!🔥🔥'))
app.post('/charge/card', async (req, res) => {
     try {
          const body = await paystack.chargeCard({
               card:{
                    cvv: '324',
                    number: '5399837841116788', 
                    expiry_year: '2024',
                    expiry_month: '08'
               },
               metadata:{ 
               },
               reference:"xuooyjtjwvxcbfi",
               pin: "0000",
               authorization_code:"AUTH_pg8d9e879p",
               device_id: '6782877y2',
               email: 'me.biodunch@xyz.ng',
               amount: "15600000" ,
          })
          console.log(body)
          
     //     let data = await initializePayment(req.body);
         res.status(200).send({data: "completed"})
     } catch (error) {
        res.status(500).send({data: null, status: 500, message:error.message})  
     }
    
})
app.use('/api/v1', emailRouter)

// Swagger Documentation 
var options = {
     explorer: true,
};
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));


app.listen(port, () => console.log(`Listening on localhost: ${port}`));
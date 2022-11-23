import express from 'express';
import Cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' assert {type: "json"};
import configData from './config.js';
import PayStack from 'paystack-node';



// Routes
import emailRouter from './src/routes/emailRoutes.js';
import driverRouter from "./src/routes/driversRouters.js";
import customerRouter from "./src/routes/customerRouters.js";
import vehicleRouter from "./src/routes/vehiclesRouters.js";
import paymentRouter from './src/routes/paymentRouter.js';



const app = express()
const port = process.env.PORT || 8005
//middlewares
app.use(express.json());

app.use(session({secret: configData.expressSessionSecrete,resave:false,saveUninitialized: true, store: MongoStore.create({mongoUrl: configData.mongoDbConnectionUrl, dbName: 'celz4db', collectionName: 'sessions', autoRemove: 'interval', autoRemoveInterval: 10, ttl: 900})}));
app.use(Cors( ));

//Endpoints
app.get('/', (req, res) => res.status(200).send('Hello CleverProgrammers!!!!!. CELZ4 API!!!🔥🔥'))
app.get('/google', (req, res) => res.redirect('api/v1/pay/successful'))

app.use('/api/v1', emailRouter)
app.use('/api/v1', driverRouter);
app.use("/api/v1", customerRouter);
app.use("/api/v1", vehicleRouter);
app.use("/api/v1", paymentRouter);

// Swagger Documentation 
var options = {
     explorer: true,
};
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));


app.listen(port, () => console.log(`Listening on localhost: ${port}`));
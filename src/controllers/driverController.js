import { createDriverData, loginDriverData, updateDriverData } from "../data/drivers/index.js";
import { validateEmail } from "../utilities/emailValidation.js";
import { encrypt } from "../utilities/hashing.js";
import Jwt from "jsonwebtoken";


const createDriver = async (req, res) => {
     try {
          let validatedEmail = validateEmail(req.body.email)
          if(validatedEmail){
               const data = req.body;
               await createDriverData(data);
             res.status(200).send({status:'Ok', data:null, message: "User has been successfully created"});
          }else{
               res.status(400).send({status:'Failed', data:null, message: "Email is invalid"});
          }  
     } catch (error) {
          res.status(400).send(error.message);
          console.log(error.message);
     }
};
const loginDriver = async (req, res) => {
     try {
          let validatedEmail = validateEmail(req.body.email)
          let hashedPassword = encrypt(req.body.password)
          if(validatedEmail){
               const data = await loginDriverData(req.body.email, hashedPassword);
               const token = Jwt.sign({
                    firstName: data[0].FirstName,
                    lastName: data[0].LastName,
                    email: req.body.email,
                    userId: data[0].UserId,
                    role: data[0].Role,
                    roleId: data[0].RoleId,
               },'tokensign123')
             res.status(200).send({status:'Ok', data: {token: token}, message: "successfully logged in"});
          }else{
               res.status(400).send({status:'Failed', data:null, message: "Email is invalid"});
          }  
        

     } catch (error) {
          res.status(400).send(error.message);
          console.log(error.message);
     }
};

const updateDriver = async (req, res) => {
    try {
        const data = req.body;
        const id = req.params.id
        const update = await updateDriverData(id, data);
        res.status(200).send(update);
    } catch (error) {
        res.status(400).send(error.message)
        console.log(error.message)
    }
}


export {updateDriver, loginDriver, createDriver}
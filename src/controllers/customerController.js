import { createCustomerData, loginCustomerData } from "../data/customer/index.js";
import { validateEmail } from "../utilities/emailValidation.js";
import { encrypt } from "../utilities/hashing.js";
import  Jwt  from "jsonwebtoken";

const createCustomer =  async (req, res) => {
    try {
     let validatedEmail = validateEmail(req.body.email)
     if(validatedEmail){

          let data = await createCustomerData(req.body);
          console.log(data)
        res.status(200).send({status:'Ok', data:null, message: "successfully Created"});
     }else{
          res.status(400).send({status:'Failed', data:null, message: "Email is invalid"});
     }  
    } catch (error) {
        res.status(400).send(error.message)
        console.log(error.message)
    }
}

const loginCustomer = async (req, res) => {
     try {
          let validatedEmail = validateEmail(req.body.email)
          let hashedPassword = encrypt(req.body.password)
          if(validatedEmail){
               const data = await loginCustomerData(req.body.email, hashedPassword);
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

export {createCustomer, loginCustomer}
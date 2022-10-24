import { createUserData } from "../data/customer/index.js";
import { validateEmail } from "../utilities/emailValidation.js";
const createUser =  async (req, res) => {
    try {
     let validatedEmail = validateEmail(req.body.email)
     if(validatedEmail){
          const data = req.body;
          await createUserData(data);
        res.status(200).send({status:'Ok', data:null, message: "User has been successfully created"});
     }else{
          res.status(400).send({status:'Failed', data:null, message: "Email is invalid"});
     }  
    } catch (error) {
        res.status(400).send(error.message)
        console.log(error.message)
    }
}

export {createUser}
import { createDriverData, updateDriverData } from "../data/drivers/index.js";
import { validateEmail } from "../utilities/emailValidation.js";


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


export {updateDriver, createDriver}
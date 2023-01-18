import { createUserData, loginUserData, getDriverData, getUserInfoData, updateUserData} from "../data/user/index.js";
import { getBuisnessInfoData } from "../data/business/index.js";
import { validateEmail } from "../utilities/emailValidation.js";
import { encrypt } from "../utilities/hashing.js";
import  Jwt  from "jsonwebtoken";

export const createUser =  async (req, res) => {
    try {
     let validatedEmail = validateEmail(req.body.email)
     if(validatedEmail){

          let data = await createUserData(req.body);
          console.log(data)
          res.status(200).send({status:'Ok', data:null, message: "successfully Created"});

     }else{
          res.status(400).send({status:'Failed', data:null, message: "Email is invalid"});
     }  
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const loginUser = async (req, res) => {
     try {
          let validatedEmail = validateEmail(req.body.email)
          let hashedPassword = encrypt(req.body.password)
          if(validatedEmail){
               const data = await loginUserData(req.body.email, hashedPassword);
               if(data[0] == undefined){
                    res.status(400).send({status:'failed', data: null, message: "email or password is incorect"});
               }else{
                    if(data[0].HasUploadedBasicInformation == true && data[0].RoleId == 2 ){ 
                        const businessInfo =  await getBuisnessInfoData(data[0].Id)
                         const token = Jwt.sign({
                              userId: userInfo[0].Id,
                              userAccountId: businessInfo[0].UserAccountId,
                              businessName: businessInfo[0].Name,
                              address: businessInfo[0].Address,
                              email: req.body.email,
                              city: businessInfo[0].City,
                              state: businessInfo[0].State,
                              inceptionDate: businessInfo[0].InceptionDate,
                              roleId: data[0].RoleId,
                         },'businessSign123')
                       res.status(200).send({status:'Ok', data: {token: token}, message: "successfully logged in"});
                    } else if(data[0].HasUploadedBasicInformation == true && data[0].RoleId == 3 ){
                         const userInfo = await getUserInfoData(data[0].Id) 

                         const token = Jwt.sign({
                              firstName: userInfo[0].FirstName,
                              lastName: userInfo[0].LastName,
                              email: req.body.email,
                              userId: userInfo[0].Id,
                              userAccountId: userInfo[0].UserAccountId,
                              dateOfBirth: userInfo[0].DateOfBirth,
                              address: userInfo[0].Address,
                              city: userInfo[0].City,
                              State: userInfo[0].State,
                              roleId: userInfo[0].RoleId
                         },'userSign123')
                       res.status(200).send({status:'Ok', data: {token: token}, message: "successfully logged in"});
                    }else{
                         res.status(200).send({status: "Ok" , data: null, message: "Kindly upload basic information for this account"})
                    }
               }
          }else{
               res.status(500).send({status:'Failed', data:null, message: "Email is invalid"});
          }  
        
     } catch (error) {
          res.status(500).send({status:'Failed', data:null, message: error.message});
     }
};

export const updateUser =  async (req, res) => {
     try {

      if(req.body != {}){
 
           let data = await updateUserData(req.body);
           console.log(data)
           res.status(200).send({status:'Ok', data:null, message: "successfully Updated"});
 
      }else{
           res.status(400).send({status:'Failed', data:null, message: "invalid Request"});
      }  
     } catch (error) {
         res.status(500).send(error.message)
     }
 }

export const getDriver = async (req, res) => {
     try {
          const data = await getDriverData(req.body.state)
          const selectedDriver = data[0];
          res.status(200).send({status:'Ok', data: {selectedDriver: selectedDriver}, message: "Successfull"})
     } catch (error) {
          res.status(400).send(error.message)
          console.log(error.message)
     }
}
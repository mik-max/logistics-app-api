import { uploadBuisnessDocumentData, updateBusinessData, verifyBuisnessDocumentData, declineBuisnessDocumentData, getBuisnessDocumentData, getBuisnessDocumentDataById, getBuisnessInfoData } from "../data/business/index.js";
import { uploadFile } from "../Services/cloudinary/index.js";

export const uploadBusinessInformation =  async (req, res) => {
     try {
          if(req.body != {}){
     
               await updateBusinessData(req.body);
               res.status(200).send({status:'Ok', data:null, message: "successfully Uploaded"});
     
          }else{
               res.status(400).send({status:'Failed', data:null, message: "Invalid request body"});
          }  
     } catch (error) {
         res.status(500).send({status:'Failed', data:null, message: error.message})
     }
 }
export const getBusinessDocuments =  async (req, res) => {
     try {
         let data = await getBuisnessDocumentData();
         res.status(200).send({status:'Ok', data:data, message: "Record fetched successfully"});
     } catch (error) {
         res.status(500).send({status:'Failed', data:null, message: error.message})
     }
 }
export const getBusinessInfo =  async (req, res) => {
     try {
          if(req.params.id){
               let data = await getBuisnessInfoData(req.params.id);
               res.status(200).send({status:'Ok', data:data, message: "Record fetched successfully"});
          }else{
               res.status(400).send({status:'Failed', data:null, message: "Id is required"});
          }
     } catch (error) {
         res.status(500).send({status:'Failed', data:null, message: error.message})
     }
 }
export const getBusinessDocumentsById =  async (req, res) => {
     try {
          if(req.params.id){
               let data = await getBuisnessDocumentDataById(req.params.id);
               res.status(200).send({status:'Ok', data:data, message: "Record fetched successfully"});
          }else{
               res.status(400).send({status:'Failed', data:null, message: "Id is required"});
          }
         
     } catch (error) {
         res.status(500).send({status:'Failed', data:null, message: error.message})
     }
 }




export const uploadBusinessDocuments = async (req, res) => {
     try {
          if(req.body.businessId && req.body.docs){
               req.body.docs.map(async(document) => {
                    let value = document.value.length > 20 ? await uploadFile(document.value) : document.value
                    await uploadBuisnessDocumentData(businessId, value, document.documentType);
               })
               res.status(201).send({status:'Ok', data:null, message: "Documents have been uploded successfully "});
               
          }else{
               res.status(400).send({status:'Failed', data:null, message: "Proof Of Address is compulsory"});
          }
     } catch (error) {
          res.status(500).send({status:'Failed', data:null, message: error.message})
     }
}

export const verifyBusinessDocuments = async ( req, res) => {
     try {
          if(req.params.id){
               await verifyBuisnessDocumentData(req.params.id);
               res.status(201).send({status:'Ok', data:null, message: "Documents have been Verified successfully "});
          }else{
               res.status(400).send({status:'Failed', data:null, message: "Id is required"});
          }
     } catch (error) {
          res.status(500).send({status:'Failed', data:null, message: error.message})
     }
}
export const declineBusinessDocuments = async ( req, res) => {
     try {
          if(req.params.id){
               await declineBuisnessDocumentData(req.params.id);
               res.status(201).send({status:'Ok', data:null, message: "Documents have been Declined successfully "});
          }else{
               res.status(400).send({status:'Failed', data:null, message: "Id is required"});
          }
     } catch (error) {
          res.status(500).send({status:'Failed', data:null, message: error.message})
     }
}


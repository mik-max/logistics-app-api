import { uploadBuisnessDocumentData } from "../data/business/index.js";
import { uploadFile } from "../Services/cloudinary/index.js";
export const uploadBusinessDocuments = (req, res) => {
     try {
          if(req.body.userId && req.body.proofOfAddress){
               let proofOfAdressUrl = await uploadFile(req.body.proofOfAddress)
               let cacUrl = await uploadFile(req.body.incorporationDocument)
               let data = {
                    userId:req.body.userId,
                    proofOfAddress: proofOfAdressUrl,
                    incorporationDocument:cacUrl,
                    taxIdentificationNumber: req.body.taxIdentificationNumber
               }
               await uploadBuisnessDocumentData(data);
               res.status(201).send({status:'Ok', data:null, message: "Documents have been uploded successfully "});
          }else{
               res.status(400).send({status:'Failed', data:null, message: "Proof Of Address is compulsory"});
          }
     } catch (error) {
          res.status(500).send(error.message)
     }
}
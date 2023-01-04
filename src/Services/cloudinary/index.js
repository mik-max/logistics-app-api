import cloudinary from "./config.js";


export const uploadFile = async(filepath) =>{
     try {
          let url = await cloudinary.uploader.upload(filepath,  function(error, result){
               return result.secure_url
          })
          return url.secure_url
     } catch (error) {
          return error.message
     }
}

import configData  from "../../../config.js";
import loadSqlQueries from "../../../utils.js";
import { encrypt } from "../../utilities/hashing.js";
import sql from 'mssql'
let sqlQueries = await loadSqlQueries('data/packages');
let generalSqlQueries = await loadSqlQueries('data/general')


const createPackageData = async (packageData) => {
     let date = new Date();
     let isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
     try {
    
          
          let pool = await sql.connect(configData.sql);
           const thePackage = await pool.request()
           .input("UserId", sql.Int, packageData.sender.userId)
           .input("Name", sql.VarChar(50), packageData.sender.name)
           .input("PhoneNumber", sql.VarChar(20), packageData.sender.phoneNumber)
           .input("State", sql.VarChar(20), packageData.sender.state)
           .input("LGA", sql.VarChar(50), packageData.sender.lga)
           .input("Address", sql.VarChar(50), packageData.sender.address)
            .input("DateCreated", sql.DateTime2, isoDateTime)
          
          
     
            .input("Name", sql.VarChar(50), packageData.receiver.name)
            .input("PhoneNumber", sql.VarChar(20), packageData.receiver.phoneNumber)
            .input("State", sql.VarChar(20), packageData.receiver.state)
            .input("LGA", sql.VarChar(50), packageData.receiver.lga)
            .input("Address", sql.VarChar(50), packageData.receiver.address)
             .input("DateCreated", sql.DateTime2, isoDateTime)
      
             
         
               .input("Name", sql.VarChar(50), packageData.name)
               .input("Category", sql.VarChar(20), packageData.category)
               .input("Weight", sql.VarChar(10), packageData.weight)
               .input("Quantity", sql.VarChar(8), packageData.quantity)
               .input("Value", sql.VarChar(10), packageData.value)
               .input("Description", sql.VarChar(150), packageData.description)
               .input("Image", sql.VarChar(200), packageData.image)
               .input("VehicleTypeId", sql.TinyInt, packageData.vehicleTypeId)
               .input("SenderId", sql.Int, packageData.senderId)
               .input("RecieverId", sql.Int, packageData.recieverId)
               .input("DriverId", sql.Int, packageData.driverId)
               .input("DateCreated", sql.DateTime2, isoDateTime)
               .query(sqlQueries.sendPackage);
               await pool.close() // closed database conection
               console.log(packageData.receiver.name)
          
           console.log(thePackage.recordset)
           return thePackage.recordset;
     } catch (error) {
         return error.message
     }
 
 }
const getPaymentMethod = async () => {
     let date = new Date();
     let isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
     try {
          let pool = await sql.connect(configData.sql)
          const paymentMethod  = await pool.request()
          .query(sqlQueries.getPaymentMethods)
          return paymentMethod.recordset
     } catch (error) {
          return error.message
     }
}
 export {createPackageData, getPaymentMethod}
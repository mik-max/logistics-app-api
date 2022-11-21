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
           
           const insertPackage = await pool.request()
           .input("UserId", sql.Int, packageData.userId)
           .input("Name", sql.VarChar(30), packageData.name)
           .input("PhoneNumber", sql.VarChar(20), packageData.phoneNumber)
           .input("State", sql.VarChar(20), packageData.state)
           .input("LGA", sql.VarChar(20), packageData.lga)
           .input("Address", sql.VarChar(50), packageData.address)
          //  .input("Name", sql.VarChar(50), packageData.name)
          //  .input("Category", sql.VarChar(20), packageData.category)
          //  .input("Weight", sql.VarChar(10), packageData.weight)
          //  .input("Qunatity", sql.VarChar(8), packageData.quantity)
          //  .input("Value", sql.VarChar(10), packageData.value)
          //  .input("Description", sql.VarChar(150), packageData.description)
          //  .input("Image", sql.VarChar(200), packageData.image)
          //  .input("VehicleTypeId", sql.TinyInt, packageData.vehicleTypeId)
          //  .input("SenderId", sql.Int, packageData.senderId)
          //  .input("RecieverId", sql.Int, packageData.recieverId)
          //  .input("DriverId", sql.Int, packageData.driverId)
           .input("DateCreated", sql.DateTime2, isoDateTime)
           .query(sqlQueries.sendPackage);
           await pool.close() // closed database conection
           console.log(insertPackage.recordset)
           return insertPackage.recordset;
     } catch (error) {
         return error.message
     }
 
 }

 export {createPackageData}
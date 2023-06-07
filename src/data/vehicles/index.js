import configData from "../../../config.js";
import loadSqlQueries from "../../../utils.js";
import sql from 'mssql'



let sqlQueries = await loadSqlQueries('data/vehicles'); 

const createVehicleData = async (Id,vehicleData) => {
    
    let date = new Date();
    let isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
    const initialStatus = "Pending";

    try {
     let pool = await sql.connect(configData.sql);
          const vehicleTypeId = await pool.request().input("Name",sql.VarChar(10),vehicleData.vehicleType)
          .query(sqlQueries.getVehicleTypeId)
          console.log(vehicleData)
         console.log("i'm here")
        const insertVehicle = await pool.request()
          .input("VehicleTypeId", sql.TinyInt, vehicleTypeId.recordset[0].Id)
          .input("Manufacturer", sql.VarChar(30), vehicleData.manufacturer)
          .input("Color", sql.VarChar(10), vehicleData.color)
          .input("Model", sql.VarChar(20), vehicleData.model)
          .input("ManufactureYear", sql.VarChar(4), vehicleData.manufactureYear)
          .input("LisencePlate", sql.VarChar(10), vehicleData.lisencePlate)
          .input('UserAccountId', sql.Int, vehicleData.userAccountId)
          .input("Status", sql.VarChar(10), initialStatus)
          .input("DateCreated", sql.DateTime2, isoDateTime)
          .query(sqlQueries.createVehicle);
          await pool.close()
          console.log("got here 2")
        return insertVehicle.recordset

    } catch (error) {
        return error.message;
    }
}

const updateVehicleData = async (Id, vehicleData) => {
        let date = new Date();
    let isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();

    try {
     let pool = await sql.connect(configData.sql);
        const list = await pool.request()
          .input("Id", sql.Int, Id)
          .input("VehicleTypeId", sql.TinyInt, vehicleTypeId.recordset[0].Id)
          .input("Manufacturer", sql.VarChar(30), vehicleData.manufacturer)
          .input("Color", sql.VarChar(10), vehicleData.color)
          .input("Model", sql.VarChar(20), vehicleData.model)
          .input("ManufactureYear", sql.VarChar(4), vehicleData.manufactureYear)
          .input("LisencePlate", sql.VarChar(10), vehicleData.lisencePlate)
          .input('UserAccountId', sql.Int, vehicleData.userAccountId)
          .input("Status", sql.VarChar(10), vehicleData.status)
         
          .input("DateModified", sql.DateTime2, isoDateTime)
          .query(sqlQueries.updateVehicle);
          await pool.close()
          
        return list.recordset;
    } catch (error) {
        return error.message
    }
}
const approveVehicleData = async (Id) => {
        let date = new Date();
    let isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
  
    try {
     let pool = await sql.connect(configData.sql);
        const list = await pool.request()
          .input("Id", sql.Int, Id)
          .input("DateModified", sql.DateTime2, isoDateTime)
          .query(sqlQueries.approveVehicle);
          await pool.close()
        return list.recordset;
    } catch (error) {
        return error.message
    }
}
const rejectVehicleData = async (Id) => {
        let date = new Date();
    let isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
    
    try {
     let pool = await sql.connect(configData.sql);
        const list = await pool.request()
          .input("Id", sql.Int, Id)
        
          .input("DateModified", sql.DateTime2, isoDateTime)
          .query(sqlQueries.rejectVehicle);
          await pool.close()
        return list.recordset;
    } catch (error) {
        return error.message
    }
}



export { createVehicleData, updateVehicleData, approveVehicleData, rejectVehicleData };
        
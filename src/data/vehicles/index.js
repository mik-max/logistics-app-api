import configData from "../../../config.js";
import loadSqlQueries from "../../../utils.js";
import sql from 'mssql'


let pool = await sql.connect(configData.sql);
let sqlQueries = await loadSqlQueries('data/vehicles'); 

const createVehicleData = async (vehicleData) => {
    let date = new Date();
    let isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
    let initialStatus = "Pending";

    try {
        const insertVehicle = await pool.request()
          .input("VehicleTypeId", sql.TinyInt, vehicleData.vehicleTypeId)
          .input("Manufacturer", sql.VarChar(30), vehicleData.manufacturer)
          .input("Color", sql.VarChar(10), vehicleData.color)
          .input("LisencePlate", sql.VarChar(10), vehicleData.lisencePlate)
          .input("Status", sql.VarChar(10), initialStatus)
          .input("DateCreated", sql.DateTime2, isoDateTime)
          .query(sqlQueries.createVehicle);
        return insertVehicle.recordset

    } catch (error) {
        return error.message;
    }
}

const updateVehicleData = async (Id, vehicleData) => {
        let date = new Date();
    let isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();

    try {
        const list = await pool.request()
          .input("Id", sql.Int, Id)
          .input("VehicleTypeId", sql.TinyInt, vehicleData.vehicleTypeId)
          .input("Manufacturer", sql.VarChar(30), vehicleData.manufacturer)
          .input("Color", sql.VarChar(10), vehicleData.color)
          .input("LisencePlate", sql.VarChar(10), vehicleData.lisencePlate)
          .input("Status", sql.VarChar(10), vehicleData.status)
         
          .input("DateModified", sql.DateTime2, isoDateTime)
          .query(sqlQueries.updateVehicle);
        return list.recordset;
    } catch (error) {
        return error.message
    }
}
const approveVehicleData = async (Id) => {
        let date = new Date();
    let isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
  
    try {
        const list = await pool.request()
          .input("Id", sql.Int, Id)
         
          .input("DateModified", sql.DateTime2, isoDateTime)
          .query(sqlQueries.approveVehicle);
        return list.recordset;
    } catch (error) {
        return error.message
    }
}
const rejectVehicleData = async (Id) => {
        let date = new Date();
    let isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
    
    try {
        const list = await pool.request()
          .input("Id", sql.Int, Id)
        
          .input("DateModified", sql.DateTime2, isoDateTime)
          .query(sqlQueries.rejectVehicle);
        return list.recordset;
    } catch (error) {
        return error.message
    }
}



export { createVehicleData, updateVehicleData, approveVehicleData, rejectVehicleData };
        
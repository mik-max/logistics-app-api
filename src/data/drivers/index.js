import configData  from '../../../config.js';
import  loadSqlQueries from '../../../utils.js'
import { encrypt } from '../../utilities/hashing.js';
import sql from 'mssql';

let sqlQueries = await loadSqlQueries('data/drivers')
let generalSqlQueries = await loadSqlQueries('data/general')


const createDriverData = async (driverData) => {
    let date = new Date();
    let isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
    const hashedPassword = encrypt(driverData.password);
    try {
          let pool = await sql.connect(configData.sql);
          const roleId = await pool.request().input('Name', sql.VarChar(20), driverData.role).query(generalSqlQueries.getRoleId)
          const insertUser = await pool.request()
          .input("FirstName", sql.VarChar(30), driverData.firstName)
          .input("LastName", sql.VarChar(30), driverData.lastName)
          .input("RoleId", sql.TinyInt, roleId.recordset[0].Id)
          .input("Email", sql.VarChar(50), driverData.email)
          .input("DateOfBirth", sql.VarChar(20), driverData.dateOfBirth)
          .input("Password", sql.VarChar(150), hashedPassword)
          .input("DateCreated", sql.DateTime2, isoDateTime)
          .query(sqlQueries.createDriver);
          await pool.close() // closed database conection
          return insertUser.recordset;
    } catch (error) {
        return error.message
    }

}


const updateDriverData = async(Id, driverData) => {
    let date = new Date();
    let isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();

    try {

        const updateUser = await pool
          .request()
          .input("Id", sql.Int, Id)
          //   .input("FirstName", sql.VarChar(30), userData.firstName)
          //   .input("LastName", sql.VarChar(30), userData.lastName)
          //   .input("RoleId", sql.TinyInt, userData.roleId)
          //   .input("Email", sql.VarChar(50), userData.email)
          .input("DateOfBirth", sql.VarChar(20), driverData.dateOfBirth)
          .input("PhoneNumber", sql.VarChar(20), driverData.phoneNumber)
          .input("Address", sql.VarChar(50), driverData.address)
          .input("City", sql.VarChar(20), driverData.city)
          .input("State", sql.VarChar(20), driverData.state)
          .input("DateModified", sql.DateTime2, isoDateTime)
          .query(generalSqlQueries.updateUser);
        let userRecordSet = updateUser.recordset;


        const updateTheDriver = await pool.request()
          .input("Id", sql.Int, Id)
          .input("RoleId", sql.TinyInt, driverData.roleId)
          .input("VehicleId", sql.Int, driverData.vehicleId)
        //   .input("Email", sql.VarChar(50), driverData.email)
        //   .input("Password", sql.VarChar(150), driverData.password)
          .input("BankName", sql.VarChar(20), driverData.bankName)
          .input("BankAccountName", sql.VarChar(30), driverData.bankAccountName)
          .input("BankAccountNumber",sql.VarChar(30), driverData.bankAccountNumber)
        //   .input("DateCreated", sql.DateTime2, isoDateTime)
          .input("DateModified", sql.DateTime2, isoDateTime)
          .input("IsDeleted", sql.Bit, driverData.isDeleted)
          .input("DateDeleted", sql.DateTime2, isoDateTime)
          .query(sqlQueries.updateDriver)
            let driverRecordSet = updateTheDriver.recordset
            
          return { userRecordSet, driverRecordSet };
    } catch (error) {
        return error.message
    }
}



export { createDriverData, updateDriverData };
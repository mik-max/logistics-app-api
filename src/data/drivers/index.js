import configData  from '../../../config.js';
import  loadSqlQueries from '../../../utils.js'
import { encrypt } from '../../utilities/hashing.js';
import sql from 'mssql';

let sqlQueries = await loadSqlQueries('data/drivers')
let generalSqlQueries = await loadSqlQueries('data/general')


// const createDriverData = async (driverData) => {
//     let date = new Date();
//     let isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
//     console.log(isoDateTime)
//     const hashedPassword = encrypt(driverData.password);
//     try {
//           console.log(driverData)
//           let pool = await sql.connect(configData.sql);
//           const roleId = await pool.request().input('Name', sql.VarChar(20), driverData.role).query(generalSqlQueries.getRoleId)
//           const insertUser = await pool.request()
//           .input("FirstName", sql.VarChar(30), driverData.firstName)
//           .input("LastName", sql.VarChar(30), driverData.lastName)
//           .input("RoleId", sql.TinyInt, roleId.recordset[0].Id)
//           .input("Email", sql.VarChar(50), driverData.email)
//           .input("WishToDrive", sql.Bit, userData.wishToDrive)
//           .input("DateOfBirth", sql.VarChar(20), driverData.dateOfBirth)
//           .input("Password", sql.VarChar(150), hashedPassword)
//           .input("DateCreated", sql.DateTime2, isoDateTime)
//           .query(sqlQueries.createDriver);
//           await pool.close() // closed database conection
//           return insertUser.recordset;
//     } catch (error) {
//         return error.message
//     }

// }
// const loginDriverData = async (email, password) => {
//     let date = new Date();
//     let isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
// //     const hashedPassword = encrypt(driverData.password);
//     try {
//           let pool = await sql.connect(configData.sql);
//           // const roleId = await pool.request().input('Name', sql.VarChar(20), driverData.role).query(generalSqlQueries.getRoleId)
//           const loginTheDriver = await pool.request()
//           .input("Email", sql.VarChar(50), email)
//           .input("Password", sql.VarChar(150), password)
//           .input('LoginDate', sql.DateTime2, isoDateTime)
//           .input("DateModified", sql.DateTime2, isoDateTime)
//           .query(sqlQueries.loginDriver);

//           const updateLogin = await pool.request().input("IsLoggedinBefore", sql.Bit, 0)
//           .query(generalSqlQueries.updataLoginStatus);
//           await pool.close() // closed database conection
//           const loginRecordset = loginTheDriver.recordset;
//           const updateLoginRecordset = updateLogin.recordset;
//           return loginTheDriver.recordset;
//     } catch (error) {
//         return error.message
//     }

// }


export const updateDriverData = async(Id, state, driverData) => {
    let date = new Date();
    let isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();

    try {

       let pool = await sql.connect(configData.sql);
     
        const updateUser = await pool.request()
          .input("UserId", sql.Int, Id)
          .input("DateOfBirth", sql.VarChar(20), driverData.dateOfBirth)
          .input("PhoneNumber", sql.VarChar(20), driverData.phoneNumber)
          .input("Address", sql.VarChar(50), driverData.address)
          .input("City", sql.VarChar(20), driverData.city)
          .input("State", sql.VarChar(20), driverData.state)
          .input("DateModified", sql.DateTime2, isoDateTime)
          .query(generalSqlQueries.updateUser);
          // await pool.close() // closed database connection
        let userRecordSet = updateUser.recordset;

        let isPlyingInterState 
        if (driverData.isPlyingInterState == "Yes") {
             isPlyingInterState = 1
        } else {
             isPlyingInterState = 0
        }

        const DriverAccountId = await pool.request().input("UserId", sql.Int, Id).query(sqlQueries.getDriverAccountId)

      
        const updateTheDriver = await pool.request()
          .input("UserId", sql.Int, DriverAccountId.recordset[0].Id)
          .input("DriverLisence", sql.VarChar(250), driverData.driverLisence)
          .input("VehicleId", sql.Int, driverData.vehicleId)
          .input("IsPlyingInterState", sql.Bit, isPlyingInterState)
          .input("Rating", sql.TinyInt, driverData.rating)
          .input("DateModified", sql.DateTime2, isoDateTime)
          .query(sqlQueries.updateDriver)
          // await pool.close() // closed database conection
            let driverRecordSet = updateTheDriver.recordset
          
   
     const StateId = await pool.request().input("Name", sql.VarChar(20), state).query(generalSqlQueries.getStateId)
          
       const addDriverState = await pool.request()
       .input("DriverAccountId", sql.Int, DriverAccountId.recordset[0].Id)
       .input("StateId", sql.Int, StateId.recordset[0].Id)
       .input("DateCreated", sql.DateTime2, isoDateTime)
       .query(sqlQueries.addDriverState)
       await pool.close() // closed database conection 
       let driverStateRecordSet =  addDriverState.recordset
      
            
          return {userRecordSet, driverRecordSet, driverStateRecordSet};
    } catch (error) {
        return error.message
    }
}



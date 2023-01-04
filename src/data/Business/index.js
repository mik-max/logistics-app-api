import configData  from "../../../config.js";
import loadSqlQueries from "../../../utils.js";
import { encrypt } from "../../utilities/hashing.js";
import sql from 'mssql'
let sqlQueries = await loadSqlQueries('data/business');
let generalSqlQueries = await loadSqlQueries('data/general')


const createBusinessData = async (businessData) => {
     let date = new Date();
     let isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
     console.log(isoDateTime)
     const hashedPassword = encrypt(businessData.password);
     try {
           console.log(businessData)
           let pool = await sql.connect(configData.sql);
           const roleId = await pool.request().input('Name', sql.VarChar(20), businessData.role).query(generalSqlQueries.getRoleId)
           const insertUser = await pool.request()
           .input("BusinessName", sql.VarChar(30), businessData.businessName)
           .input("RoleId", sql.TinyInt, roleId.recordset[0].Id)
           .input("Email", sql.VarChar(50), businessData.email)
           .input("Password", sql.VarChar(150), hashedPassword)
           .input("DateCreated", sql.DateTime2, isoDateTime)
           .query(sqlQueries.createBusiness); 
           await pool.close() // closed database conection
           return insertUser.recordset;
     } catch (error) {
         return error.message
     }
 
 }

 const loginBusinessData = async (email, password) => {
     let date = new Date();
     let isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
 //     const hashedPassword = encrypt(driverData.password);
     try {
           let pool = await sql.connect(configData.sql);
           // const roleId = await pool.request().input('Name', sql.VarChar(20), driverData.role).query(generalSqlQueries.getRoleId)
           const loginTheBusiness = await pool.request()
           .input("Email", sql.VarChar(50), email)
           .input("Password", sql.VarChar(150), password)
           .input("IsLoggedinBefore", sql.Bit, 1)
           .input('LoginDate', sql.DateTime2, isoDateTime)
           .input("DateModified", sql.DateTime2, isoDateTime)
           .query(sqlQueries.loginBusiness);
 
          //  const updateLogin = await pool.request().input("IsLoggedinBefore", sql.Bit, 1)
          //  .query(generalSqlQueries.updataLoginStatus);
          //  await pool.close() // closed database conection
           const loginRecordset = loginTheBusiness.recordset;
           const updateLoginRecordset = updateLogin.recordset;
           return {loginRecordset, updateLoginRecordset};
     } catch (error) {
         return error.message
     }
 
 }

 export {createBusinessData, loginBusinessData}
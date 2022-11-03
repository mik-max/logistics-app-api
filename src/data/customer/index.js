import configData  from "../../../config.js";
import loadSqlQueries from "../../../utils.js";
import { encrypt } from "../../utilities/hashing.js";
import sql from 'mssql'
let sqlQueries = await loadSqlQueries('data/customer');
let generalSqlQueries = await loadSqlQueries('data/general')

const createCustomerData = async (userData) => {
     let date = new Date();
     let isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
     const hashedPassword = encrypt(userData.password);
     try {
           let pool = await sql.connect(configData.sql);
           const roleId = await pool.request().input('Name', sql.VarChar(20), userData.role).query(generalSqlQueries.getRoleId)
           const insertUser = await pool.request()
           .input("FirstName", sql.VarChar(30), userData.firstName)
           .input("LastName", sql.VarChar(30), userData.lastName)
           .input("RoleId", sql.TinyInt, roleId.recordset[0].Id)
           .input("Email", sql.VarChar(50), userData.email)
           .input("Password", sql.VarChar(150), hashedPassword)
           .input("DateCreated", sql.DateTime2, isoDateTime)
           .query(sqlQueries.createCustomer);
           await pool.close() // closed database conection
           return insertUser.recordset;
     } catch (error) {
         return error.message
     }
 
 }

 const loginCustomerData = async (email, password) => {
     let date = new Date();
     let isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
 //     const hashedPassword = encrypt(driverData.password);
     try {
           let pool = await sql.connect(configData.sql);
           // const roleId = await pool.request().input('Name', sql.VarChar(20), driverData.role).query(generalSqlQueries.getRoleId)
           const loginTheCustomer = await pool.request()
           .input("Email", sql.VarChar(50), email)
           .input("Password", sql.VarChar(150), password)
           .input('LoginDate', sql.DateTime2, isoDateTime)
           .input("DateModified", sql.DateTime2, isoDateTime)
           .query(sqlQueries.loginCustomer);
 
           const updateLogin = await pool.request().input("IsLoggedinBefore", sql.Bit, 0)
           .query(generalSqlQueries.updataLoginStatus);
           await pool.close() // closed database conection
           const loginRecordset = loginTheCustomer.recordset;
           const updateLoginRecordset = updateLogin.recordset;
           return loginTheCustomer.recordset;
     } catch (error) {
         return error.message
     }
 
 }

export { createCustomerData, loginCustomerData };
import configData  from "../../../config.js";
import loadSqlQueries from "../../../utils.js";
import { encrypt } from "../../utilities/hashing.js";
import sql from 'mssql'
let sqlQueries = await loadSqlQueries('data/customer');
let generalSqlQueries = await loadSqlQueries('data/general')

const createUserData = async (userData) => {
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
           .query(sqlQueries.createUser);
           await pool.close() // closed database conection
           return insertUser.recordset;
     } catch (error) {
         return error.message
     }
 
 }

export { createUserData };
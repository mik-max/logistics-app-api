import configData  from "../../../config.js";
import loadSqlQueries from "../../../utils.js";
import { encrypt } from "../../utilities/hashing.js";
import sql from 'mssql'
let sqlQueries = await loadSqlQueries('data/user');
let generalSqlQueries = await loadSqlQueries('data/general')

export const createUserData = async (userData) => {   
     try {
          let date = new Date();
          let isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
          const hashedPassword = encrypt(userData.password);
           let pool = await sql.connect(configData.sql);
           const roleId = await pool.request().input('Name', sql.VarChar(20), userData.role).query(generalSqlQueries.getRoleId);
           const insertUser = await pool.request()
           .input("RoleId", sql.TinyInt, roleId.recordset[0].Id)
           .input("Email", sql.VarChar(50), userData.email)
           .input("WishToDrive", sql.Bit, userData.wishToDrive)
           .input("Password", sql.VarChar(150), hashedPassword)
           .input("DateCreated", sql.DateTime2, isoDateTime)
           .query(sqlQueries.create);
           await pool.close() // closed database conection
           return insertUser.recordset;
     } catch (error) {
         return error.message
     }
 
}

export const loginUserData = async (email, password) => {
     
     try {
           let date = new Date();
           let isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();

           let pool = await sql.connect(configData.sql);
           const loginUser = await pool.request()
           .input("Email", sql.VarChar(50), email)
           .input("Password", sql.VarChar(150), password)
           .input('LoginTime', sql.DateTime2, isoDateTime)
          //  .input("DateModified", sql.DateTime2, isoDateTime)
           .query(sqlQueries.login);

           await pool.close() // closed database conection

           return loginUser.recordset;
     } catch (error) {
         return error.message
     }
 
}
export const updateUserData = async (userData) => {
     
     try {
           let date = new Date();
           let isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();

           let pool = await sql.connect(configData.sql);
           const updateUser = await pool.request()
           .input("UserAccountId", sql.Int, userData.UserAccountId)
           .input("FirstName", sql.VarChar(30), userData.firstName)
           .input("LastName", sql.VarChar(30), userData.lastName)
           .input("DateOfBirth", sql.VarChar(20), userData.dateOfBirth)
           .input("Address", sql.VarChar(50), userData.address)
           .input("City", sql.VarChar(20), userData.city)
           .input("State", sql.VarChar(20), userData.State)
           .input('DateCreated', sql.DateTime2, isoDateTime)
          //  .input("DateModified", sql.DateTime2, isoDateTime)
           .query(sqlQueries.updateUser);

           await pool.close() // closed database conection

           return updateUser.recordset;
     } catch (error) {
         return error.message
     }
}

export const getDriverData = async (state) => {
     try {
          let pool = await sql.connect(configData.sql);
          const StateId = await pool.request().input("Name", sql.VarChar(20), state).query(generalSqlQueries.getStateId)
          const getDriver = await pool.request()
          .input("StateId", sql.Int, StateId.recordset[0].Id).query(sqlQueries.selectDriver)
          await pool.close() // closed database conection
          return getDriver.recordset
     } catch (error) {
          return error.message
     }
}

export const getUserInfoData = async (id) => {
     try {
          let pool = await sql.connect(configData.sql);
          const userDocuments = await pool.request()
           .input("Id", sql.Int, id)
           .query(sqlQueries.createBusiness);
           await pool.close() // closed database conection
           return userDocuments.recordset
     } catch (error) {
          return error.message
     }
 }

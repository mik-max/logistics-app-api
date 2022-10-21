import loadSqlQueries from "../../../utils.js";
import configData from "../../../config.js";
import sql from 'mssql';
let sqlQueries = await loadSqlQueries('data/email');


const createNewOtpData = async (otp, emailAddress) => {
     let date = new Date(); 
     let isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
     let expiryDate = new Date((date.getTime() - (date.getTimezoneOffset() * 60000)) + 2700000 ).toISOString()
     try {
          let pool = await sql.connect(configData.sql);
          const insertOtp = await pool.request()
          .input('Otp', sql.VarChar(150), otp)
          .input('EmailAddress', sql.VarChar(50), emailAddress)
          .input('DateCreated', sql.DateTime2, isoDateTime)
          .input('ExpiresAt', sql.DateTime2, expiryDate)
          .query(sqlQueries.createOtp)
          await pool.close() // closed database conection
          return insertOtp.recordset;
     } catch (error) {
          return error.message;
     }
}

const getOtpData = async (Otp) => {
     try {
          const pool = await sql.connect(configData.sql);
          const list = await pool.request().input('Otp', sql.VarChar(150), Otp)
          .query(sqlQueries.getOtp)
          await pool.close() // closed database connection
          return list.recordset[0]
     } catch (error) {
          return error.message;
     }
}
const getAllOtpData = async () => {
     try {
          const pool = await sql.connect(configData.sql);
          const list = await pool.request().query(sqlQueries.getAllOtps)
          await pool.close() // closed database connection
          return list.recordset
     } catch (error) {
          return error.message;
     }
}
const verifyOtpData = async (Otp) => {
     try {
          const pool = await sql.connect(configData.sql);
          const list = await pool.request().input('Otp', sql.VarChar(150), Otp)
          .query(sqlQueries.verifyOtp)
          await pool.close() // closed database connection
          return list.recordset
     } catch (error) {
          return error.message;
     }
}
const expireOtpData = async (Otp) => {
     try {
          const pool = await sql.connect(configData.sql);
          const list = await pool.request().input('Otp', sql.VarChar(150), Otp)
          .query(sqlQueries.expiryOtp)
          await pool.close() // closed database connection
          return list.recordset
     } catch (error) {
          return error.message;
     }
}
export {createNewOtpData, getOtpData, getAllOtpData, verifyOtpData, expireOtpData}
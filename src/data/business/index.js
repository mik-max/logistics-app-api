import configData  from "../../../config.js";
import loadSqlQueries from "../../../utils.js";
import { encrypt } from "../../utilities/hashing.js";
import sql from 'mssql'
let sqlQueries = await loadSqlQueries('data/business');
let generalSqlQueries = await loadSqlQueries('data/general')


export const uploadBuisnessDocumentData = async (businessId, value,  documentType) => {
     
     try {
           let pool = await sql.connect(configData.sql);
           const documentTypeId = await pool.request().input('Name', sql.VarChar(20), documentType).query(generalSqlQueries.getDocumentTypeId)
           const businessDocuments = await pool.request()
           .input("BusinessId", sql.Int, businessId)
           .input("Value", sql.VarChar(200), value)
           .input("DocumentTypeId", sql.SmallInt, documentTypeId.recordset[0].Id)
           .query(sqlQueries.upload); 
           await pool.close() // closed database conection
           return businessDocuments.recordset;
     } catch (error) {
         return error.message
     }
 
 }

export const updateBusinessData = async (businessData) => {
     try {
          let date = new Date();
          let isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
          let pool = await sql.connect(configData.sql);
          const business = await pool.request()
          .input("UserAccountId", sql.Int, businessData.userAcountId)
          .input("Name", sql.VarChar(50), businessData.name)
          .input("Address", sql.VarChar(50), businessData.address)
          .input("City", sql.VarChar(20), businessData.city)
          .input("State", sql.VarChar(20), businessData.state)
          .input("InceptionDate", sql.VarChar(10), businessData.inceptionDate)
          .input("DateCreated", sql.DateTime2, isoDateTime)
          .query(sqlQueries.updateBusinessInformation); 
           await pool.close() // closed database conection
           return business.recordset;
     } catch (error) {
          return error.message
     }
}
export const getBuisnessInfoData = async (id) => {
     try {
          let pool = await sql.connect(configData.sql);
          const businessInfo = await pool.request()
          .input("Id", sql.Int, id)
          .query(sqlQueries.getBusinessBasicInfo); 
           await pool.close() // closed database conection
           return businessInfo.recordset;
     } catch (error) {
          return error.message
     }
}
export const getBuisnessDocumentData = async () => {
     try {
          let pool = await sql.connect(configData.sql);
          const businessDocs = await pool.request()
          .query(sqlQueries.getBusinessDocuments); 
           await pool.close() // closed database conection
           return businessDocs.recordset;
     } catch (error) {
          return error.message
     }
}
export const getBuisnessDocumentDataById = async (id) => {
     try {
          let pool = await sql.connect(configData.sql);
          const businessDocs = await pool.request()
          .input("Id", sql.Int, id)
          .query(sqlQueries.getBusinessDocumentById); 
           await pool.close() // closed database conection
           return businessDocs.recordset;
     } catch (error) {
          return error.message
     }
}
export const verifyBuisnessDocumentData = async (id) => {
     try {
          let pool = await sql.connect(configData.sql);
          const businessDocs = await pool.request()
          .input("Id", sql.Int, id)
          .query(sqlQueries.verifyBusinessDocument); 
           await pool.close() // closed database conection
           return businessDocs.recordset;
     } catch (error) {
          return error.message
     }
}
export const declineBuisnessDocumentData = async (id) => {
     try {
          let pool = await sql.connect(configData.sql);
          const businessDocs = await pool.request()
          .input("Id", sql.Int, id)
          .query(sqlQueries.declineBusinessDocument); 
           await pool.close() // closed database conection
           return businessDocs.recordset;
     } catch (error) {
          return error.message
     }
}

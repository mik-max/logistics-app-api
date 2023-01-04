import configData  from "../../../config.js";
import loadSqlQueries from "../../../utils.js";
import sql from 'mssql'
let sqlQueries = await loadSqlQueries('data/business');

export const uploadBuisnessDocumentData = async (businessData) => {
     try {
          let pool = await sql.connect(configData.sql)
          const businessDocument = await pool.request()
           .input("UserId", sql.Int, businessData.userId)
           .input("TaxIdentificationNumber", sql.VarChar(50), businessData.taxIdentificationNumber)
           .input("ProofOfAddress", sql.VarChar(50), businessData.proofOfAddress)
           .input("IncorporationDocument", sql.VarChar(50), businessData.incorporationDocument)
           .query(sqlQueries.upload)
           await pool.close();
           return businessDocument.recordset
          
     } catch (error) {
          return error.message
     }
}
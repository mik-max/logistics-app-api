import configData  from "../../../config.js";
import loadSqlQueries from "../../../utils.js";
import { encrypt } from "../../utilities/hashing.js";
import sql from 'mssql';
let sqlQueries = await loadSqlQueries('data/transactions');

export const createDebitTransactionData = async (data, ref, charge) => {
     let date = new Date();
     let isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
     try {
          let pool = await sql.connect(configData.sql);
          const result = await pool.request()
          .input('PaymentMethodId', sql.TinyInt, data.paymentMethodId)
          .input('BeneficiaryUserId', sql.Int, data.beneficiaryUserId)
          .input('SenderUserId', sql.Int, data.senderUserId)
          .input('Amount', sql.Decimal(19, 4), data.totalAmount)
          .input('TransactionReference', sql.VarChar(15), ref)
          .input('Charges', sql.Decimal(19, 4), charge)
          .input('CurrencyId', sql.Int, data.currencyId)
          .input('DateCreated', sql.DateTime2, isoDateTime)
          .query(sqlQueries.createDebitTransaction)
          pool.close()
          return result.recordset;
     } catch (error) {
          return error.message
     }
}

export const authorizeDebitTransactionData = async (Id, ref) => {
     let date = new Date();
     let isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
     try {
          let pool = await sql.connect(configData.sql);
          const result = await pool.request()
          .input('Id', sql.Int, Id)
          .input('ExternalReference', sql.VarChar(50), ref )
          .input('DateModified', sql.DateTime2, isoDateTime)
          .query(sqlQueries.authDebitTransaction)
          pool.close()
          return result.recordset;
     } catch (error) {
          return error.message
     }
}
export const validateDebitTransactionData = async (Id, dateCreated) => {
     let date = new Date();
     let isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
     try {
          let pool = await sql.connect(configData.sql);
          const result = await pool.request()
          .input('Id', sql.Int, Id)
          .input('DateModified', sql.DateTime2, isoDateTime)
          .query(sqlQueries.validateDebitTransaction)
          pool.close()
          return result.recordset;
     } catch (error) {
          return error.message
     }
}
export const createChargeData = async (chargeTypeId, charge, Id) => {
     let date = new Date();
     let isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
     try {
          let pool = await sql.connect(configData.sql);
          const result = await pool.request()
          .input('ChargeTypeId', sql.SmallInt, chargeTypeId)
          .input('Value', sql.Decimal(19, 4), charge)
          .input('DebitTransactionId', sql.Int, Id)
          .input('DateCreated', sql.DateTime2, isoDateTime)
          .query(sqlQueries.newCharge)
          pool.close()
          return result.recordset;
     } catch (error) {
          return error.message
     }
}
export const createEscrowTransactionData = async (Id, dateCreated) => {
     let date = new Date();
     let isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
     try {
          let pool = await sql.connect(configData.sql);
          const result = await pool.request()
          .input('DebitTransactionId', sql.Int, Id)
          .input('DateCreated', sql.DateTime2, dateCreated)
          .input('DateCompleted', sql.DateTime2, isoDateTime)
          .query(sqlQueries.createEscrowTransaction)
          pool.close()
          return result.recordset;
     } catch (error) {
          return error.message
     }
}
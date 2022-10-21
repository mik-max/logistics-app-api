import configData  from "../../../config.js";
import loadSqlQueries from "../../../utils.js";
import sql from 'mssql'

let pool = await sql.connect(configData);
let sqlQueries = await loadSqlQueries('data/customer');

const createUserData = async (customerData) => {
    let date = new Date();
    let isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset()* 60000)).toISOString();

    try {
        const insertUser = await pool.request()
        .input('FirstName',sql.VarChar(30), customerData.firstName)
        .input('LastName',sql.VarChar(30), customerData.lastName)
        .input('RoleId',sql.TinyInt, customerData.roleId )
        .input('Email',sql.VarChar(50), customerData.email)
        .input('DateOfBirth',sql.VarChar(20), customerData.dateOfBirth)
        .input('PhoneNumber',sql.VarChar(20), customerData.phoneNumber)
        .input('Address',sql.VarChar(50), customerData.address)
        .input('City',sql.VarChar(20), customerData.city)
        .input('State',sql.VarChar(20), customerData.state)
        .input('DateCreated',sql.DateTime2, isoDateTime)
        .query(sqlQueries.createUser)
        return insertUser.recordset;

    } catch (error) {
        return error.message
    }
}

export { createUserData };
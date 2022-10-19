import bcrypt from 'bcrypt'
import configData from '../../config.js';
export function encrypt (password){
     const salt = configData.otpSalt;
     console.log(salt)
     const hash = bcrypt.hashSync(password, salt);     
     return hash;
}


export function compareHash (password, passwordHash){
     let result = bcrypt.compareSync(password, passwordHash); // true
     return result;
}